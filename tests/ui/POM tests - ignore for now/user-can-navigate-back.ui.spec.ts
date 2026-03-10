import { test } from '@playwright/test';
import { RateLimitsPage } from '../../../pages/RateLimitsPage';

test('Users can navigate back to previous pages or the homepage without issues', async ({ page }) => {
  const rateLimitsPage = new RateLimitsPage(page);
  await rateLimitsPage.goto();
  await rateLimitsPage.clickFirstDocLink();
  await rateLimitsPage.goBack();
  await rateLimitsPage.expectOnRateLimitsPage();
  await rateLimitsPage.clickHomeLinkIfAvailable();
});
