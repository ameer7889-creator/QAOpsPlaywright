// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* max time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'blob',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName: 'chromium',
    headless: true,
    //actionTimeout: 10 * 1000,
    //navigationTimeout: 30 * 1000,
    //screenshot:'on',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
});
  
