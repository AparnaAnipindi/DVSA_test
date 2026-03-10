import { setWorldConstructor, World } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import type { Browser, Page } from 'playwright';

export class CustomWorld extends World {
  browser: Browser | undefined;
  page: Page | undefined;
  errorCode?: string;

  constructor(options: any) {
    super(options);
  }

  async openBrowser() {
    // Use headless mode in CI/Docker, headed locally
    const isCI = process.env.CI === 'true' || process.env.DOCKER === 'true';
    this.browser = await chromium.launch({ headless: isCI });
    this.page = await this.browser.newPage();
  }

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(CustomWorld);
