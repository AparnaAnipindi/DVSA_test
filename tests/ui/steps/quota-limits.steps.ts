import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.ts';

Given('the user navigates to the MOT History API documentation homepage', async function (this: CustomWorld) {
  if (!this.page) throw new Error('No browser page available');
  await this.page.goto('https://documentation.history.mot.api.gov.uk/');
});

When('the user opens the {string} section', async function (this: CustomWorld, section: string) {
  if (!this.page) throw new Error('No browser page available');
  await this.page.getByRole('link', { name: new RegExp(section, 'i') }).click();
});

Then('the documentation should display the quota limit', async function (this: CustomWorld) {
  if (!this.page) throw new Error('No browser page available');
  await expect(this.page.getByRole('cell', { name: 'Quota' })).toBeVisible();
});


Then('the quota limit should state {string}', async function (this: CustomWorld, quota: string) {
  if (!this.page) throw new Error('No browser page available');
  await expect(this.page.getByRole('cell', { name: new RegExp(quota) })).toBeVisible();
});
