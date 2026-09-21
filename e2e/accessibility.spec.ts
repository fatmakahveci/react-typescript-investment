import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('has no automatically detectable WCAG A/AA violations before and after calculation', async ({ page }, testInfo) => {
  await page.goto('/');
  for (const state of ['empty', 'results']) {
    if (state === 'results') await page.getByRole('button', { name: /try an example/i }).click();
    const report = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    await testInfo.attach(`accessibility-${state}`, { body: JSON.stringify(report, null, 2), contentType: 'application/json' });
    expect(report.violations).toEqual([]);
  }
});

test('exposes named inputs, result headings and table headers to assistive technology', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('spinbutton', { name: /current savings/i })).toHaveAttribute('required', '');
  await expect(page.getByRole('spinbutton', { name: /expected inflation/i })).toHaveAccessibleDescription(/purchasing power/i);
  await page.getByRole('button', { name: /try an example/i }).click();
  await expect(page.getByRole('heading', { name: /investment snapshot/i })).toBeFocused();
  await expect(page.getByRole('table')).toHaveAccessibleName(/year-by-year growth/i);
  await expect(page.getByRole('columnheader')).toHaveCount(6);
  await expect(page.getByRole('rowheader')).toHaveCount(10);
  await expect(page.getByRole('group', { name: 'Result actions' })).toBeVisible();
});
