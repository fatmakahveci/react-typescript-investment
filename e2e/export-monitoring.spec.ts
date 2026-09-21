import { expect, test } from '@playwright/test';

test('exports every projection year as numeric CSV', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /try an example/i }).click();
  const downloadEvent = page.waitForEvent('download');
  await page.getByRole('button', { name: /download csv/i }).click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe('investment-projection-USD.csv');
  const stream = await download.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of stream!) chunks.push(Buffer.from(chunk));
  const rows = Buffer.concat(chunks).toString('utf8').trim().split('\n').map((row) => row.split(','));
  expect(rows).toHaveLength(11);
  expect(rows[0]).toHaveLength(6);
  expect(rows[10][0]).toBe('10');
  expect(Number(rows[10][1])).toBeCloseTo(63367.82, 2);
  expect(Number(rows[10][4])).toBe(40000);
  expect(rows.slice(1).every((row) => row.every((value) => Number.isFinite(Number(value))))).toBe(true);
});

test('copies a share URL that restores the same projection', async ({ page }) => {
  // Capture clipboard writes consistently across browser permission models.
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: {
      writeText: async (value: string) => { document.documentElement.dataset.copiedUrl = value; },
    } });
  });
  await page.goto('/');
  await page.getByRole('button', { name: /try an example/i }).click();
  await page.getByRole('button', { name: /copy share link/i }).click();
  const url = await page.locator('html').getAttribute('data-copied-url');
  expect(new URL(url!).searchParams.get('contribution')).toBe('250');
  await page.goto(url!);
  await expect(page.locator('.summary')).toContainText('$63,367.82');
  await expect(page.getByLabel(/monthly contribution/i)).toHaveValue('250');
});

test('reports client failures without shared financial URL parameters', async ({ page, request }) => {
  await page.addInitScript(() => {
    const sendBeacon = navigator.sendBeacon.bind(navigator);
    navigator.sendBeacon = (url, data) => {
      if (data instanceof Blob) void data.text().then((text) => { document.documentElement.dataset.errorReport = text; });
      return sendBeacon(url, data);
    };
  });
  const health = await request.get('/api/health');
  expect(health.ok()).toBe(true);
  expect(await health.json()).toEqual({ status: 'ok' });
  await page.goto('/?currentSavings=12345');
  const report = page.waitForResponse((r) => r.url().endsWith('/api/errors') && r.request().method() === 'POST');
  await page.evaluate(() => window.dispatchEvent(new ErrorEvent('error', { error: new Error('Synthetic monitoring check') })));
  expect((await report).status()).toBe(204);
  await expect(page.locator('html')).toHaveAttribute('data-error-report', /Synthetic monitoring check/);
  const payload = JSON.parse((await page.locator('html').getAttribute('data-error-report'))!);
  expect(payload.message).toBe('Synthetic monitoring check');
  expect(payload.url).not.toContain('?');
  expect(payload.url).not.toContain('12345');
});
