import { expect, test } from '@playwright/test';

test('calculates and displays a responsive investment projection', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel(/current savings/i).fill('10000');
  await page.getByLabel(/monthly contribution/i).fill('200');
  await page.getByLabel(/expected return/i).fill('7');
  await page.getByLabel(/investment duration/i).fill('10');
  await page.getByRole('button', { name: /calculate projection/i }).click();

  await expect(page.getByRole('heading', { name: /investment snapshot/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /scenario comparison/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /growth over time/i })).toBeVisible();
  await expect(page.getByRole('table')).toBeVisible();
  await expect(page.locator('body')).not.toHaveCSS('overflow-x', 'auto');
});

test('restores a shared projection from the URL', async ({ page }) => {
  await page.goto('/?currentSavings=5000&contribution=150&contributionFrequency=monthly&expectedReturn=6&compoundingFrequency=monthly&inflationRate=2&duration=5&currency=EUR&lang=tr');

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { name: 'Investment Calculator', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: /investment snapshot/i })).toBeVisible();
  await expect(page.getByLabel(/current savings/i)).toHaveValue('5000');
  await expect(page.getByLabel('Currency', { exact: true })).toHaveValue('EUR');
  await expect(page.locator('.summary').getByText(/€/).first()).toBeVisible();
});

test('loads the example and resets the workspace', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /try an example/i }).click();
  await expect(page.getByRole('heading', { name: /investment snapshot/i })).toBeVisible();
  await expect(page.getByLabel(/current savings/i)).toHaveValue('10000');
  await expect(page.getByLabel(/monthly contribution/i)).toHaveValue('250');
  await expect(page.locator('.summary')).toContainText('$63,367.82');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(page.getByRole('button', { name: /try an example/i })).toBeVisible();
  await expect(page.getByLabel(/current savings/i)).toHaveValue('');
  await expect(page.locator('.summary')).toHaveCount(0);
});
