const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../Utils/APIUtils');
const loginPayload = { userEmail: "ameer.7889@gmail.com", userPassword: "Password$123" };
const orderPayLoad = { orders: [{ country: "Indonesia", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const fakePayLoad = { data: [], message: "No Orders" }


let response;
test.beforeAll('Login', async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayLoad);

});

test('Verify order', async ({ page }) => {

    page.addInitScript(authToken => {
        window.localStorage.setItem("token", authToken);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client/");

    //1st argument which url you want to route, place it inside route below and 
    // second argument how u want to route by using async route() function

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            //intercepting response: API gives the response ->{intercpeting and faking response with playwright}-> browser-> render data on front end    
            const response = await page.request.fetch(route.request()); //route have so many properties. we want to get url. so using request() inside fetch
            let body = JSON.stringify(fakePayLoad);
            //fulfil method send back the response to the browser
            await route.fulfill({
                response,
                body,
            });
        }
    )

    //clicking on order history page and verifying the order id is present in the list
    await page.locator("[routerlink*='myorders']").first().click();
    //await page.locator("label[routerlink*='myorders']").click();
    //await page.locator("button[routerlink*='myorders']").click();

    //if you run into request disposal error add this line for fix loading issue
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

    console.log(await page.locator(".mt-4").textContent());
    //await page.pause();

    await expect(page.locator(".mt-4")).toHaveText(" You have No Orders to show at this time. Please Visit Back Us ");


});