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

test('switches the complete form to Turkish', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'TR' }).click();

  await expect(page.getByRole('heading', { name: 'Yatırım Hesaplayıcı' })).toBeVisible();
  await expect(page.getByRole('button', { name: /projeksiyonu hesapla/i })).toBeVisible();
  await expect(page.getByLabel(/mevcut birikim/i)).toBeVisible();
});

test('restores a shared projection from the URL', async ({ page }) => {
  await page.goto('/?currentSavings=5000&contribution=150&contributionFrequency=monthly&expectedReturn=6&compoundingFrequency=monthly&inflationRate=2&duration=5&currency=EUR&lang=tr');

  await expect(page.getByRole('heading', { name: /yatırım özetiniz/i })).toBeVisible();
  await expect(page.getByLabel(/mevcut birikim/i)).toHaveValue('5000');
  await expect(page.getByText(/€/).first()).toBeVisible();
});
