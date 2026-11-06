// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
const config = ({
  testDir: './tests',
  retries:1,

  /* max time one test can run for. */
  timeout: 30 * 1000, // if extra timeout needed at global level
  expect: {      //if timeout needed for assertions
    timeout: 5000,
  },

  //test files will trigger in parellel, but the inidivual tests in the file will run in sequence

  projects: [
    {
      name: 'Safari',
      use: {
        browserName: 'webkit',
        headless: false,
        //actionTimeout: 10 * 1000,
        //navigationTimeout: 30 * 1000,
        //screenshot:'on',
        screenshot: 'only-on-failure',
        trace: 'only-on-failure',
        ...devices['iPhone 11']//array of devices
      },
    },
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: false,
        //actionTimeout: 10 * 1000,
        //navigationTimeout: 30 * 1000,
        screenshot: 'on',
        video: 'retain-on-failure', //on, //off, //on-first-retry
        ignoreHttpsErrors:true,// for handling SSL certificate errors
        permissions:['geolocation'],//for granting access to location pop ups
        //screenshot: 'only-on-failure',
        trace: 'on',
        viewport: { width: 1280, height: 720 },
        
      }
    },

    {
      name: 'Firefox',
      use: {
        browserName: 'firefox',
        headless: false,
        //actionTimeout: 10 * 1000,
        //navigationTimeout: 30 * 1000,
        screenshot: 'off',
        //screenshot: 'only-on-failure',
        video: 'retain-on-failure', //on, //off, //on-first-retry
        ignoreHttpsErrors:true,// for handling SSL certificate errors
        permissions:['geolocation'],//for granting access to location pop ups
        //screenshot: 'only-on-failure',
        trace: 'off',
        viewport: { width: 720, height: 720 },
  
      }
    } 
  ],
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    browserName: 'webkit',
    headless: true,
    //actionTimeout: 10 * 1000,
    //navigationTimeout: 30 * 1000,
    //screenshot:'on',
    screenshot: 'only-on-failure',
    trace: 'only-on-failure'
  },


});


