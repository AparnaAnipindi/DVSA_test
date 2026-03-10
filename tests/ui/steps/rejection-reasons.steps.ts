import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.ts';

Then('the documentation should display reasons why an API application may be rejected', async function (this: CustomWorld) {
  if (!this.page) throw new Error('No browser page available');
  // Look for the question heading as it appears in the documentation
  await expect(this.page.getByText('Why was my API application rejected?', { exact: true })).toBeVisible();
});

Then('the reasons should include {string}', async function (this: CustomWorld, reason: string) {
  if (!this.page) throw new Error('No browser page available');
  await expect(this.page.getByText(new RegExp(reason, 'i'))).toBeVisible();
});
