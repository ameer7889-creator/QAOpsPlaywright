const {test, expect} = require ('@playwright/test');
test ('Client App Login', async({page})=>
{   
    const email = "ameer.7889@gmail.com";
    const productName = "iphone 13 pro";
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.locator("#userPassword").fill("Password$123");
    await page.getByRole("button", {name: 'login'}).click();
    //using wait for load state to load network to grab all the titles of products
    //await page.waitForLoadState("networkidle");
    //2 ways of handling synchronization if waitForLoadState not working use below way. anyone is fine
    await page.locator(".card-body b").first().waitFor();
    
    //writing entire forloop in one line using filter and getByRole
    await page.locator(".card-body b").filter({hasText:productName}).getByRole("button", {name:"Add To Cart"}).click();

    await page.getByRole("listitem").getByRole("button", {name:"Cart"}).click();
    
    await page.locator("div li").first().waitFor();//waiting fot the first element to load in the cart page before asserting the product is present in the cart page    

    await expect(page.getByText("iPhone 13 pro")).toBeVisible(); //item visible in cart page

    await page.getByRole("button", {name:"Checkout"}).click();
    
    //CC info
    await page.locator("//form/div/div[1]/div/input").fill("4888 1234 5678 1000");
    await page.locator("select:nth-child(2)").selectOption("08");
    await page.locator("select:nth-child(3)").selectOption("31");
    await page.locator("//form/div/div[2]/div[2]/input").fill("123");
    await page.locator("form > div > div:nth-child(3) > div > input").fill("ameer shaik");
    await page.locator("[name='coupon']").fill("rahulshettyacademy");

    //applying coupon and verifying the success message
    await page.getByRole('button', { name: 'Apply Coupon' }).click();
    
    const couponSuccessMsg = await page.locator("p[class*='mt-1']").textContent();
    console.log(couponSuccessMsg);
    expect(couponSuccessMsg).toContain("* Coupon Applied");
    
    //selecting country from the dropdown and clicking on place order button
    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
    
    await page.getByRole("button", {name: "India"}).nth(1).click();
    //await page.pause();

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.getByText("PLACE ORDER").click();
    
    //verifying the success message after placing the order
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);

    //clicking on order history page and verifying the order id is present in the list
    //await page.locator("[routerlink*='myorders']").first().click(); // use this if you have multiple elements with same locator and you want to click on first one
    await page.locator("label[routerlink*='myorders']").click(); //use this if you have only one element with the locator and you want to click on that element
    //await page.locator("button[routerlink*='myorders']").click(); //use this if you have only one element with the locator and you want to click on that element
    
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    const rowCount = await rows.count();

    for (let i=0; i<rowCount; ++i)
    {
        const rowOrderID = await rows.nth(i).locator("th").textContent();

        if(orderID.includes(rowOrderID))
        {
            await rows.nth(i).locator(".btn-primary").first().click();
            break;
        }
    }

    //verifying the order id in the details page is same as the order id in the order history page
    const orderIdOnDetailsPage = await page.locator(".col-text").textContent();
    expect(orderID.includes(orderIdOnDetailsPage)).toBeTruthy();

    //await page.pause();

});