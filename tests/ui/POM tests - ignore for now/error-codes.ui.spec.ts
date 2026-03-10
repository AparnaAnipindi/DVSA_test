import { test, expect } from '@playwright/test';

test('MOT API error codes page displays MOTH-NP-01 and its description', async ({ page }) => {
  await page.goto('/mot-history-api/error-codes/');
  const errorCode = await page.getByText('MOTH-NP-01');
  await expect(errorCode).toBeVisible();
  const description = await page.getByText(/DVLA ID is required but has not been provided in the request/i);
  await expect(description).toBeVisible();
});
