import{test, expect} from '@playwright/test';

test('@web Playwright special locators', async({page})=>
{
    test.setTimeout(60*1000); //overriding the default timeout of 30 seconds to 60 seconds at test level.
    //page.waitfor();//wait for the locator to load.
    const slowExpect = expect.configure({timeout:10000}); //overriding the default timeout of 5 seconds to 10 seconds at test level.
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    
    await page.locator("form input[name='name']").fill("Ameer Shaik");
    await page.locator("form input[name='email']").fill("abc1234@gmail.com");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("Password");
    await page.getByRole("button",{name:'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!").isVisible();//returns a boolean value true or false
    
    //5 sconds defalut timeout for expect assertion to be visible, if not visible within 5 seconds then test will fail
    await slowExpect(page.getByText("Success! The Form has been submitted successfully!")).toBeVisible();//assertion will fail or pass the test

    //to override the default timeout of 5 seconds, we can use {timeout:10000} at step level.
   // await expect(page.getByText("Success! The Form has been submitted successfully!")).toBeVisible({timeout:10000});

    await page.getByRole("link",{name:"shop"}).click();
    await slowExpect(page.locator("h1.my-4")).toHaveText("Shop Name");
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button",{name:"Add "}).click();


});