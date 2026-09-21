import { describe, expect, it, vi } from 'vitest';
import { POST } from './route';

describe('client error endpoint', () => {
  it.each([undefined, '1'])('rejects oversized reports regardless of declared length: %s', async (length) => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    try {
      const headers = length ? { 'content-length': length } : undefined;
      const response = await POST(new Request('http://localhost/api/errors', {
        method: 'POST', headers, body: JSON.stringify({ message: 'x'.repeat(8192) }),
      }));
      expect(response.status).toBe(413);
      expect(log).not.toHaveBeenCalled();
    } finally { log.mockRestore(); }
  });

  it('counts UTF-8 bytes rather than characters and stops reading a chunked body', async () => {
    const cancel = vi.fn();
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('{"message":"'));
        controller.enqueue(new TextEncoder().encode('€'.repeat(2800)));
      }, cancel,
    });
    const request = new Request('http://localhost/api/errors', {
      method: 'POST', body, duplex: 'half',
    } as RequestInit);
    expect((await POST(request)).status).toBe(413);
    expect(cancel).toHaveBeenCalledOnce();
  });

  it.each(['null', '[]', '42', '{"message":{}}', '{broken'])('rejects malformed reports: %s', async (body) => {
    expect((await POST(new Request('http://localhost/api/errors', { method: 'POST', body }))).status).toBe(400);
  });

  it('removes credentials, query values and fragments from logged report URLs', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    try {
      const response = await POST(new Request('http://localhost/api/errors', {
        method: 'POST', body: JSON.stringify({ url: 'https://user:secret@example.com/calculator?currentSavings=12345#private' }),
      }));
      expect(response.status).toBe(204);
      const report = JSON.parse(log.mock.calls[0][1]);
      expect(report.url).toBe('https://example.com/calculator');
    } finally { log.mockRestore(); }
  });
  it('accepts a public origin when Next uses an internal request hostname', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    try {
      const response = await POST(new Request('http://localhost/api/errors', {
        method: 'POST', headers: { host: 'calculator.example', origin: 'https://calculator.example' }, body: '{}',
      }));
      expect(response.status).toBe(204);
    } finally { log.mockRestore(); }
  });
  it('accepts and sanitizes same-origin reports', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const response = await POST(new Request('http://localhost/api/errors', {
      method: 'POST',
      headers: { 'content-type': 'application/json', origin: 'http://localhost' },
      body: JSON.stringify({ message: 'Example error', url: 'http://localhost/' }),
    }));

    expect(response.status).toBe(204);
    expect(consoleError).toHaveBeenCalledWith('[client-error]', expect.stringContaining('Example error'));
    consoleError.mockRestore();
  });

  it('rejects cross-origin reports', async () => {
    const response = await POST(new Request('http://localhost/api/errors', {
      method: 'POST',
      headers: { 'content-type': 'application/json', origin: 'https://example.com' },
      body: '{}',
    }));

    expect(response.status).toBe(403);
  });
});
