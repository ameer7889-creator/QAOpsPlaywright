const {test, expect, request} = require('@playwright/test');
const { APIUtils } = require('../Utils/APIUtils');
const loginPayload = {userEmail:"ameer.7889@gmail.com",userPassword:"Password$123"};
const orderPayLoad = {orders:[{country:"Indonesia",productOrderedId:"6960eac0c941646b7a8b3e68"}]};

let response;
test.beforeAll('Login',async ()=>
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(orderPayLoad);

});

test ('@API Verify order', async({page})=>
{
    
    page.addInitScript(authToken => {
        window.localStorage.setItem("token", authToken);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client/");
    
    //clicking on order history page and verifying the order id is present in the list
    await page.locator("[routerlink*='myorders']").first().click(); 
    //await page.locator("label[routerlink*='myorders']").click();
    //await page.locator("button[routerlink*='myorders']").click();
    
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    const rowCount = await rows.count();

    for (let i=0; i<rowCount; ++i)
    {
        const rowOrderId = await rows.nth(i).locator("th").textContent();

        if(response.orderId.includes(rowOrderId))
        {
            await rows.nth(i).locator(".btn-primary").first().click();
            break;
        }
    }

    //verifying the order id in the details page is same as the order id in the order history page
    const orderIdOnDetailsPage = await page.locator(".col-text").textContent();
    //await page.pause();

    expect(response.orderId.includes(orderIdOnDetailsPage)).toBeTruthy();


});