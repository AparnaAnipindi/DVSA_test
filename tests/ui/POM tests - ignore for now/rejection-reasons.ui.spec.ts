import { test, expect } from '@playwright/test';

test('MOT API documentation displays reasons for rejection of application', async ({ page }) => {
  await page.goto('/mot-history-api/support');
  await expect(page.getByText('Why was my API application rejected?')).toBeVisible();
  await expect(page.getByText('no contact email provided')).toBeVisible();
  await expect(page.getByText('a postal address that cannot be recognised')).toBeVisible();
  await expect(page.getByText('an organisation, business or individual already being registered to use the API')).toBeVisible();
  await expect(page.getByText('If your application is rejected, you will be sent an email explaining why.')).toBeVisible();
});
