const {test, expect, request} = require ('@playwright/test');
const {customtest} = require('../Utils/Fixtures.js');

customtest ("Fixtures Demo", async ({authenticatedPage,createOrder, testDataForOrder })=>
{
    await authenticatedPage.goto("https://rahulshettyacademy.com/client");
    await authenticatedPage.locator("[routerlink*='myorders']").first().click();
    await authenticatedPage.locator("tbody").waitFor();
   
    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();

    console.log (testDataForOrder.productName);
});