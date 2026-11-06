import { test, expect, Locator, Page } from '@playwright/test';
import { customTest } from '../Utils_TS/TestDataFixture';
import { POManager } from '../PageObjects_TS/POManager';

//JSon--> covert to String--> JS object
const dataset = JSON.parse(JSON.stringify(require('../Utils/Placeorder_data.json')));
//driving data through a JSON file

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
        let orderId: any;
        orderId = await checkoutPage.SubmitAndGetOrderId();
        //The assertion fails because `orderId` includes pipe delimiters (`" | … | "`), while `getOrderId()` returns only the ID. The page snapshot confirms the ID itself is present. Normalize the extracted value, then use an exact equality assertion:
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
        let orderDetailsId: any;
        orderDetailsId = await orderdetailsPage.getOrderId();
        expect(orderDetailsId.trim()).toBe(expectedOrderId);
        //expect(orderDetailsId).toContain(orderId);
    });
}

//driving data through a fixture
customTest (`Login and go to checkout`, async ({ page, testDataForOrder }) => {

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
