const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { POManager } = require('../../PageObjects/POManager');
const playwright = require('@playwright/test');


Given(': Login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

    //login page
    const products = this.page.locator(".card-body");
    const loginPage = this.poManager.getLoginPage();
    await loginPage.navigateTo();
    await loginPage.validLogin(username, password);

});
When(': Add {string} to cart', async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();

});

Then(': Verify {string} is displayed in the cart', async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();

});

When(': Enter all valid details and place the order', async function () {

    const checkoutPage = this.poManager.getCheckoutPage();
    await checkoutPage.searchCountryAndSelect("ind", "India");
    this.orderId = await checkoutPage.SubmitAndGetOrderId();
    //The assertion fails because `orderId` includes pipe delimiters (`" | … | "`), while `getOrderId()` returns only the ID. The page snapshot confirms the ID itself is present. Normalize the extracted value, then use an exact equality assertion:
    this.expectedOrderId = this.orderId.replace(/\s*\|\s*/g, '').trim();
    console.log(this.orderId);
    console.log(this.expectedOrderId);

});

Then(': Verify the order details in the order details page', async function () {

    await this.dashboardPage.navigateToOrders();
    //Order details page
    const orderdetailsPage = this.poManager.getOrderdetailsPage();
    await orderdetailsPage.searchOrderAndSelect(this.orderId);
    const orderDetailsId = await orderdetailsPage.getOrderId();
    expect(orderDetailsId.trim()).toBe(this.expectedOrderId);
});
//************

Given(': Login to Ecommerce2 application with {string} and {string}', async function (username, password) {

    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    const userName = this.page.locator("#username");
    const signin = this.page.locator("#signInBtn");

    await userName.fill(username);
    await this.page.locator("[name='password']").fill(password);
    await signin.click();


});

Then(': Verify error message is displayed', async function () {

    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
});