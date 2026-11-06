const {test,expect} = require('playwright/test');

test('EventHub1 test', async({page})=>
{
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.getByPlaceholder("you@email.com").fill("ameertest1@gmail.com");
    await page.getByLabel("Password").fill("Password$123");
    //await page.getByTestId("register-password").fill("Password$123");
    await page.getByRole("button", {name: "Sign In"}).click();
    await page.getByRole("button",{name: "Admin"}).click();
    await page.locator("a[href*='admin/events']").first().click();
    await page.getByTestId("event-title-input").fill("Join for Webinar");
    await page.locator("#category").selectOption("Workshop");
    await page.getByPlaceholder("Venue name & address").fill("Hyderabad hall123");
    await page.getByLabel('Event Date & Time').fill('2027-12-31T10:00');
    
    //await page.pause();
});
