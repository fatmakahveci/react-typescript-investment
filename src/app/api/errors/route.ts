const MAX_PAYLOAD_SIZE = 8_192;

const safeReportUrl = (value: unknown): string => {
  if (typeof value !== 'string') return '';
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) return '';
    return `${url.origin}${url.pathname}`.slice(0, 1_000);
  } catch {
    return '';
  }
};

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const requestUrl = new URL(request.url);

  if (origin) {
    try {
      const source = new URL(origin);
      // Next's internal request URL can use localhost behind a proxy.
      // Compare the browser origin with the actual HTTP Host instead.
      if (!['http:', 'https:'].includes(source.protocol) || source.host !== (request.headers.get('host') ?? requestUrl.host)) {
        return new Response(null, { status: 403 });
      }
    } catch {
      return new Response(null, { status: 403 });
    }
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > MAX_PAYLOAD_SIZE) {
    return new Response(null, { status: 413 });
  }

  try {
    const reader = request.body?.getReader();
    if (!reader) return Response.json({ error: 'Invalid error report' }, { status: 400 });
    const chunks: Uint8Array[] = [];
    let size = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > MAX_PAYLOAD_SIZE) {
          await reader.cancel();
          return new Response(null, { status: 413 });
        }
        chunks.push(value);
      }
    } finally {
      reader.releaseLock();
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    const payload: unknown = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return Response.json({ error: 'Invalid error report' }, { status: 400 });
    }
    const report = payload as Record<string, unknown>;
    for (const key of ['message', 'stack', 'url', 'userAgent', 'timestamp']) {
      if (report[key] !== undefined && typeof report[key] !== 'string') {
        return Response.json({ error: 'Invalid error report' }, { status: 400 });
      }
    }
    const errorEvent = {
      message: String(report.message ?? 'Unknown client error').slice(0, 500),
      stack: String(report.stack ?? '').slice(0, 4_000),
      url: safeReportUrl(report.url),
      userAgent: String(report.userAgent ?? '').slice(0, 500),
      timestamp: String(report.timestamp ?? '').slice(0, 64),
    };

    console.error('[client-error]', JSON.stringify(errorEvent));
    return new Response(null, {
      status: 204,
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return Response.json({ error: 'Invalid error report' }, { status: 400 });
  }
}
