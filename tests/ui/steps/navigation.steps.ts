import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.ts';

When('the user navigates back', async function (this: CustomWorld) {
  if (!this.page) throw new Error('No browser page available');
  await this.page.goBack();
});

When('the user clicks the Home link', async function (this: CustomWorld) {
  if (!this.page) throw new Error('No browser page available');
  // Click the header homepage link by class or href
  const homeLink = this.page.locator('a.govuk-header__link--homepage[href="/"]');
  await homeLink.first().click();
});

Then('the user should see the MOT History API documentation homepage', async function (this: CustomWorld) {
  if (!this.page) throw new Error('No browser page available');
  await expect(this.page).toHaveURL('https://documentation.history.mot.api.gov.uk/');
  // Check for the unique homepage heading
  await expect(this.page.getByRole('heading', { name: /MOT history API/i, level: 1 })).toBeVisible();
});
