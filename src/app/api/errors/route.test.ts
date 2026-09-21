import { describe, expect, it, vi } from 'vitest';
import { POST } from './route';

describe('client error endpoint', () => {
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
