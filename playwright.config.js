// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
  const config = ({
  testDir: './tests', 


  
  /* max time one test can run for. */
  timeout: 30*1000, // if extra timeout needed at global level
    expect :{      //if timeout needed for assertions
      timeout: 5000,
    },
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    browserName: 'chromium',
    headless: false,
    //actionTimeout: 10 * 1000,
    //navigationTimeout: 30 * 1000,
    screenshot:'on',
    //screenshot: 'only-on-failure',
    trace:'on'
  },
  
  
});
module.exports = config
  
