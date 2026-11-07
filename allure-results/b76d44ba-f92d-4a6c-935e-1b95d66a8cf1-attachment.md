# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientApp.spec.js >> Client App Login
- Location: tests/ClientApp.spec.js:2:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('div li').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator." [ref=e11] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [aria-hidden] [ref=e24]: 
          - text: Sign Out
  - generic [ref=e25]:
    - generic [ref=e26]:
      - heading "My Cart" [level=1] [ref=e27]
      - button "Continue Shopping❯" [ref=e28] [cursor=pointer]
    - heading "No Products in Your Cart !" [level=1] [ref=e30]
```

# Test source

```ts
  1   | const {test, expect} = require ('@playwright/test');
  2   | test ('Client App Login', async({page})=>
  3   | {   
  4   |     const email = "ameer.7889@gmail.com";
  5   |     const productName = "iphone 13 pro";
  6   |     const products = page.locator(".card-body");
  7   |     await page.goto("https://rahulshettyacademy.com/client/");
  8   |     await page.getByPlaceholder("email@example.com").fill(email);
  9   |     await page.locator("#userPassword").fill("Password$123");
  10  |     await page.getByRole("button", {name: 'login'}).click();
  11  |     //using wait for load state to load network to grab all the titles of products
  12  |     //await page.waitForLoadState("networkidle");
  13  |     //2 ways of handling synchronization if waitForLoadState not working use below way. anyone is fine
  14  |     await page.locator(".card-body b").first().waitFor();
  15  |     const allTitles = await page.locator(".card-body b").allTextContents();
  16  |     console.log(allTitles);
  17  |     const count = await products.count();
  18  | 
  19  |     for(let i=0; i<count; ++i)
  20  |     {
  21  |         if (await products.nth(i).locator("b").textContent() === productName)
  22  |         {
  23  |             //add to cart
  24  |             await products.nth(i).locator("text = Add To Cart").click();//locating element using text of product
  25  |             break;
  26  |         }
  27  |     }
  28  |     await page.locator("[routerlink*='cart']").click();
  29  |     
> 30  |     await page.locator("div li").first().waitFor();
      |                                          ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  31  | 
  32  |     //inorder to avoid product is being identified in home page using locator as "tagname:has-text("productname")".
  33  |     const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible(); // sudo class in locator means ' :has-text '
  34  | 
  35  |     expect(bool).toBeTruthy();
  36  | 
  37  |     await page.locator("text='Checkout'").click();
  38  |     
  39  |     //CC info
  40  |     await page.locator("//form/div/div[1]/div/input").fill("4888 1234 5678 1000");
  41  |     await page.locator("select:nth-child(2)").selectOption("08");
  42  |     await page.locator("select:nth-child(3)").selectOption("31");
  43  |     await page.locator("//form/div/div[2]/div[2]/input").fill("123");
  44  |     await page.locator("form > div > div:nth-child(3) > div > input").fill("ameer shaik");
  45  |     await page.locator("[name='coupon']").fill("rahulshettyacademy");
  46  | 
  47  |     //applying coupon and verifying the success message
  48  |     await page.getByRole('button', { name: 'Apply Coupon' }).click();
  49  |     
  50  |     const couponSuccessMsg = await page.locator("p[class*='mt-1']").textContent();
  51  |     console.log(couponSuccessMsg);
  52  |     expect(couponSuccessMsg).toContain("* Coupon Applied");
  53  |     
  54  |     //selecting country from the dropdown and clicking on place order button
  55  |     await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
  56  |     const results = page.locator(".ta-results");
  57  |     await results.waitFor();
  58  |     const resultsCount = await results.locator("button").count();
  59  | 
  60  |     for (let i=0; i<resultsCount; ++i)
  61  |     {
  62  |         const countryName = await results.locator("button").nth(i).textContent();
  63  |         if (countryName === " India")//there are other ways to do this if you have space in the name
  64  |         // if(countryName.trim()==='Inida') or if(countryName.includes("india"))
  65  | 
  66  |         {
  67  |             await results.locator("button").nth(i).click();
  68  |             break;
  69  |         }
  70  |     }
  71  |     //await page.pause();
  72  | 
  73  |     await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
  74  |     await page.locator(".action__submit").click();
  75  |     
  76  |     //verifying the success message after placing the order
  77  |     await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  78  | 
  79  |     const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  80  |     console.log(orderID);
  81  | 
  82  |     //clicking on order history page and verifying the order id is present in the list
  83  |     //await page.locator("[routerlink*='myorders']").first().click(); // use this if you have multiple elements with same locator and you want to click on first one
  84  |     await page.locator("label[routerlink*='myorders']").click(); //use this if you have only one element with the locator and you want to click on that element
  85  |     //await page.locator("button[routerlink*='myorders']").click(); //use this if you have only one element with the locator and you want to click on that element
  86  |     
  87  |     await page.locator("tbody").waitFor();
  88  |     const rows = page.locator("tbody tr");
  89  |     const rowCount = await rows.count();
  90  | 
  91  |     for (let i=0; i<rowCount; ++i)
  92  |     {
  93  |         const rowOrderID = await rows.nth(i).locator("th").textContent();
  94  | 
  95  |         if(orderID.includes(rowOrderID))
  96  |         {
  97  |             await rows.nth(i).locator(".btn-primary").first().click();
  98  |             break;
  99  |         }
  100 |     }
  101 | 
  102 |     //verifying the order id in the details page is same as the order id in the order history page
  103 |     const orderIdOnDetailsPage = await page.locator(".col-text").textContent();
  104 |     expect(orderID.includes(orderIdOnDetailsPage)).toBeTruthy();
  105 | 
  106 |     //await page.pause();
  107 | 
  108 | });
```