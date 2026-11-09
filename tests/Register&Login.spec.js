const {test, expect} = require('@playwright/test');
const { title } = require('node:process');

test('RegisterLogin playwright test', async ({page})=>
{
    
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator(".text-reset").click()
    await page.getByPlaceholder("First Name").fill("ameer")
    await page.getByLabel("Last Name").fill("Shaik")
    await page.locator("#userEmail").fill("ameer.s@gmail.com")
    await page.getByPlaceholder("enter your number").fill("9861245321")
    await page.locator(".custom-select").selectOption("Engineer")
    await page.locator("//input[@value='Male']").click()
    await page.locator("#userPassword").fill("Passsword$123")
    await page.locator("#confirmPassword").fill("Passsword$123")
    await page.locator(".col-md-1").click()
    await page.getByRole("button", { name: 'Register'}).click()
    await page.locator(".text-reset").click()
    await page.getByPlaceholder("email@example.com").fill("ameer.7889@gmail.com")
    await page.locator("#userPassword").fill("Password$123")
    await page.getByRole("button", {name: 'login'}).click()
    //const titlesWithPrice = await page.locator(".card-body")
    //console.log(await titlesWithPrice.first().textContent())

    //using wait for load state to load network to grab all the titles of products
    await page.waitForLoadState("networkidle")
    //2 ways of handling synchronization if waitForLoadState not working use below way. anyone is fine
    await page.locator(".card-body b").first().waitFor()
    const titles = await page.locator(".card-body b").allTextContents()
    console.log(titles)

});
test('@web UI Controls', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = page.locator("#username");
    const password = page.locator("#password");
    const signin =  page.locator("#signInBtn");
    const documentLink = page.locator("[href*='document']");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    
    await page.locator(".customradio").last().click();
    await page.locator("#okayBtn").click();
    await expect(page.locator(".customradio").last()).toBeChecked();
    //await page.pause();
    console.log(await page.locator(".customradio").last().isChecked());
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    await expect(documentLink).toHaveAttribute("class", "blinkingText");


});
test('Child Window Handling', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator("#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='document']");
    //handling child window
    const [childPage] = await Promise.all //An array of promises. use this whener you want a set of actions go in parellel
    ([context.waitForEvent('page'),//listen for any new pages opened.
    //in JS, it's considered as 'promoise'. Promise will have 3 states. 1. Pending, 2. Rejected, 3. Fulfilled
    documentLink.click(), // new page is opened
    ])
    await childPage.waitForLoadState();

    const text = await childPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(".")[0];
    console.log(domain);
    //page.pause();
    await page.locator("#username").fill(domain);

    console.log(await page.locator("#username").inputValue());
});