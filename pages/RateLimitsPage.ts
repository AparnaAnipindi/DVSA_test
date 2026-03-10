import { expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';

export class RateLimitsPage {
  readonly page: Page;
  readonly docLinks: Locator;
  readonly homeLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.docLinks = page.locator('nav[aria-label="Pages in this section"] a');
    this.homeLink = page.getByRole('link', { name: /home|mot api/i });
  }

  async goto() {
    await this.page.goto('/mot-history-api/rate-limits/');
  }

  async clickFirstDocLink() {
    const count = await this.docLinks.count();
    expect(count).toBeGreaterThan(1);
    await this.docLinks.nth(0).click();
  }

  async goBack() {
    await this.page.goBack();
  }

  async expectOnRateLimitsPage() {
    await expect(this.page).toHaveURL(/rate-limits/);
  }

  async clickHomeLinkIfAvailable() {
    if (await this.homeLink.count()) {
      await this.homeLink.first().click();
      await expect(this.page).toHaveURL(/mot-history-api/);
    }
  }
}
