import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.ts';

Given('the user navigates to the "Error codes" documentation page', async function (this: CustomWorld) {
  if (!this.page) throw new Error('No browser page available');
  await this.page.goto('https://documentation.history.mot.api.gov.uk/mot-history-api/error-codes/');
});

When('the user searches for error code {string}', async function (this: CustomWorld, errorCode: string) {
  if (!this.page) throw new Error('No browser page available');
  // Optionally, scroll or filter if needed, but for now just store the code for later steps
  this.errorCode = errorCode;
});

Then('the error code should be present in the error codes table', async function (this: CustomWorld) {
  if (!this.page) throw new Error('No browser page available');
  await expect(this.page.getByRole('cell', { name: this.errorCode })).toBeVisible();
});

Then('the description should be {string}', async function (this: CustomWorld, description: string) {
  if (!this.page) throw new Error('No browser page available');
  // Find the row with the error code and check the next cell for the description
  const row = this.page.locator('tr').filter({ has: this.page.locator('td', { hasText: this.errorCode }) });
  // The second cell in the row is the description for the error code
  const descriptionCell = row.locator('td').nth(1);
  await expect(descriptionCell).toHaveText(description);
});
