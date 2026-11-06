const playwright  = require('@playwright/test');
const {POManager} = require('../../PageObjects/POManager');
const { Before, After, BeforeStep, AfterStep,Status } = require('@cucumber/cucumber');
const path = require('node:path');

Before(async function () {
  const browser = await playwright.chromium.launch({

        headless:false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
})

BeforeStep(function () {
  // This hook will be executed before all steps in a scenario with tag @foo
})

AfterStep(async function ({ result }) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    await this.page.screenshot({path: 'test-results/failedSS.png'});
  }
})


After(function () {
  // Assuming this.driver is a selenium webdriver
  console.log("Tear down and execution completed");
})