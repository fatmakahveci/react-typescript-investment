const MAX_PAYLOAD_SIZE = 8_192;

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
    const payload = await request.json() as Record<string, unknown>;
    const errorEvent = {
      message: String(payload.message ?? 'Unknown client error').slice(0, 500),
      stack: String(payload.stack ?? '').slice(0, 4_000),
      url: String(payload.url ?? '').slice(0, 1_000),
      userAgent: String(payload.userAgent ?? '').slice(0, 500),
      timestamp: String(payload.timestamp ?? '').slice(0, 64),
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
