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
    this.browser = await chromium.launch({ headless: false });
    this.page = await this.browser.newPage();
  }

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(CustomWorld);
