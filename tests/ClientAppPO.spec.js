const { customtest } = require('../Utils/TestDataFixture')
const { test, expect } = require('@playwright/test');
const { POManager } = require('../PageObjects/POManager');
//JSon--> cover to String--> JS object
const dataset = JSON.parse(JSON.stringify(require('../Utils/Placeorder_data.json')));

for (const data of dataset) {
    test(`Login and Place order test for ${data.product}`, async ({ page }) => {
        const poManager = new POManager(page);
        const CC = "4888 1234 5678 1000";
        const month = '08';
        const day = '31';
        const cvv = '123';
        const ccname = "ameer shaik";
        const coupon = "rahulshettyacademy";
        const expectedCouponMsg = "* Coupon Applied";
        const countryCode = "Ind";
        const desiredName = "India";
        const expectedTYMsg = " Thankyou for the order. ";
        const products = page.locator(".card-body");


        //login page
        const loginPage = poManager.getLoginPage();
        await loginPage.navigateTo();
        await loginPage.validLogin(data.username, data.password);
        //Dashboard Page
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.product);
        await dashboardPage.navigateToCart();

        //Cart Page
        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(data.product);
        await cartPage.Checkout();

        //Cehckout Page

        const checkoutPage = poManager.getCheckoutPage();
        await checkoutPage.fillCardCoupon(CC, month, day, cvv, ccname, coupon, expectedCouponMsg);
        await checkoutPage.searchCountryAndSelect(countryCode, desiredName);
        const orderId = await checkoutPage.SubmitAndGetOrderId();
        //The assertion fails because `orderId` includes pipe delimiters (`" | … | "`), while `getOrderId()` returns only the ID. Normalize the extracted value, then use an exact equality assertion:
        const expectedOrderId = orderId.replace(/\s*\|\s*/g, '').trim();
        console.log(orderId);
        console.log(expectedOrderId);
        //await checkoutPage.VerifyEmailId(username);

        //ThankYou Page

        const thankyouPage = poManager.getThankyouPage();
        // await thankyouPage.ClickMyOrders();
        //await page.pause();
        await dashboardPage.navigateToOrders();
        //Order details page
        const orderdetailsPage = poManager.getOrderdetailsPage();
        await orderdetailsPage.searchOrderAndSelect(orderId);
        const orderDetailsId = await orderdetailsPage.getOrderId();
        expect(await orderDetailsId.trim()).toBe(expectedOrderId);
        expect.soft(orderDetailsId).toContain(orderId);
    });
}
customtest(`Login and go to checkout`, async ({ page, testDataForOrder }) => {

    const poManager = new POManager(page);

    //login page
    const loginPage = poManager.getLoginPage();
    await loginPage.navigateTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
    //Dashboard Page
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.product);
    await dashboardPage.navigateToCart();

    //Cart Page
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.product);
    await cartPage.Checkout();

});
