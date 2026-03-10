import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  globalSetup: './global-setup.ts',
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    trace: 'on',
    headless: true,
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'api',
      testMatch: /.*\.http\.spec\.ts/,
      use: {
        baseURL: 'https://history.mot.api.gov.uk',
        extraHTTPHeaders: {
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN || ''}`,
          'X-API-Key': process.env.API_KEY || '',
        },
      },
    },
    {
      name: 'ui',
      testMatch: /.*\.ui\.spec\.ts/,
      use: {
        baseURL: process.env.TEST_CLIENT_URL || 'https://documentation.history.mot.api.gov.uk/',
        ...devices['Desktop Chrome'],
      },
    },
    // Add other browser projects if needed
  ],
});
