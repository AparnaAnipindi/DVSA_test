import { test, expect } from '@playwright/test';

test('MOT API documentation displays quota/rate limits table with correct values', async ({ page }) => {
  await page.goto('/mot-history-api/rate-limits/');
  await expect(page.getByRole('columnheader', { name: 'Limit type', exact: true })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'Description', exact: true })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'Limit', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Quota' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Maximum number of requests you can make in a day' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '500000' })).toBeVisible();
});
