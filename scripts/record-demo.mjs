import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1120, height: 840 }, deviceScaleFactor: 1, locale: 'en-US' });
    const frames = [], delays = [], errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:3100/', { waitUntil: 'networkidle' });
    await page.addStyleTag({ content: 'nextjs-portal { display: none !important; }' });
    await page.evaluate(() => document.fonts.ready);
    async function capture(delay = 100) {
      const png = await page.screenshot();
      frames.push(await sharp(png).removeAlpha().raw().toBuffer());
      delays.push(delay);
    }
    async function scrollTo(target) {
      const start = await page.evaluate(() => window.scrollY);
      for (let i = 1; i <= 12; i++) {
        const t = i / 12, ease = t * t * (3 - 2 * t);
        await page.evaluate(y => window.scrollTo(0, y), start + (target - start) * ease);
        await capture(80);
      }
    }
    await capture(1400);
    for (const [id, value] of [['current-savings', '10000'], ['contribution', '250'], ['expected-return', '7'], ['duration', '10']]) {
      const input = page.locator('#' + id);
      await input.focus();
      for (const digit of value) {
        await input.pressSequentially(digit);
        await capture(120);
      }
      delays[delays.length - 1] += 400;
    }
    await page.getByRole('button', { name: 'Calculate projection', exact: true }).hover();
    await capture(700);
    await page.getByRole('button', { name: 'Calculate projection', exact: true }).click();
    await page.locator('.summary').waitFor();
    await capture(450);
    const summaryTop = await page.locator('.summary').evaluate(el => el.getBoundingClientRect().top + window.scrollY - 35);
    await scrollTo(summaryTop);
    await capture(3500);
    const chartTop = await page.locator('.chart').evaluate(el => el.getBoundingClientRect().top + window.scrollY - 35);
    await scrollTo(chartTop);
    await capture(2800);
    await scrollTo(0);
    await page.getByRole('button', { name: 'Reset', exact: true }).click();
    await capture(1000);
    await page.getByRole('button', { name: /try an example/i }).click();
    await scrollTo(summaryTop);
    await capture(2200);
    await page.getByRole('button', { name: 'Reset', exact: true }).click();
    await scrollTo(0);
    await capture(800);
    if (errors.length) throw new Error(errors.join('\n'));
    const output = fileURLToPath(new URL('../demo.gif', import.meta.url));
    await sharp(Buffer.concat(frames), { raw: { width: 1120, height: 840 * frames.length, channels: 3, pageHeight: 840 } })
      .gif({ loop: 0, delay: delays, colours: 128, dither: 0, effort: 7 })
      .toFile(output);
    const metadata = await sharp(output, { animated: true }).metadata();
    console.log(JSON.stringify({ output, frames: metadata.pages, width: metadata.width, height: metadata.pageHeight, durationSeconds: delays.reduce((a,b) => a+b,0)/1000, bytes: (await fs.stat(output)).size, pageErrors: errors }, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
