const {test, expect} = require('@playwright/test');
const { Assert } = require('node:assert');
const { assert } = require('node:console');
const { request } = require('node:http');

test('@web Browser Context Playwright test', async function({browser}) //{browser} is playwright global fixture passed as an argument. 
//{browser} is playwright global fixture passed as an argument. 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    //page.route('**/*.csv', route=> route.abort());
    //page.route('**/*.{jpg,jpeg,png}', route=> route.abort());
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    const userName = page.locator("#username")
    const signin = page.locator("#signInBtn")
    const product_titles = page.locator(".card-body a")
    page.on('request', request=>console.log(request.url()));//printing all the network calls made using .on event listener
    page.on('response',response=>console.log(response.url(), response.status()));// printing response and status of the netwrok calls made
    await userName.fill("rahulshetty")
    await page.locator("[name='password']").fill("Learning@830$3mK2")
    await signin.click()
    console.log(await page.locator("[style*='block']").textContent())
    await expect(page.locator("[style*='block']")).toContainText("Incorrect")

    //correcting credentils and entering correct values
    await userName.fill("")
    await userName.fill("rahulshettyacademy")
    await signin.click()

    //accessing elements in different ways and printing
    console.log(await product_titles.first().textContent())
    await expect(product_titles.first()).toContainText("iphone X")
    console.log(await product_titles.nth(1).textContent())
    console.log(await product_titles.last().textContent())

    //to get all the titles of the prodcuts using a list

    const all_titles = await product_titles.allTextContents()
    console.log(all_titles)


});

//test.only annotation will help run only that test
test('Page Playwright test', async ({page})=> //an anonymous function () can be writtens as ()=> in latest JS
{
    //Page fixture is used when you want to open a dafult browser. you can avoid below 2 lines by passing page as an argument
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});