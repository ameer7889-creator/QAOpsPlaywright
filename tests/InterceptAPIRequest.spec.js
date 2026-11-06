const { test,expect } = require('@playwright/test');

test('Intercept API Request for security testing', async({page})=> {
    //login to view orders page
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.getByPlaceholder("email@example.com").fill("ameer.7889@gmail.com");
    await page.locator("#userPassword").fill("Password$123");
    await page.getByRole("button", { name: 'login' }).click();

    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6711d910ae2afd4c0b9f67c6' }));
    await page.locator("button:has-text('View')").first().click();
    
    const message = await page.locator("div p:first-child").textContent();

    console.log(message);

    await expect(page.locator("div p:first-child")).toHaveText(message);

    //await page.pause();


});