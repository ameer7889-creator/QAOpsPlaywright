const {test, expect} = require('@playwright/test');
//to run tests in side one parellel
test.describe.configure({mode:'parallel'});

//if you have tests depend on others or where there's an inter dependecny use "serial" mode.
//test.describe.configure({mode:'serial'});

test('@web MoreUI test', async ({ page }) => 
    {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        await expect(page.locator("#displayed-text")).toBeVisible();
        await page.locator("#hide-textbox").click();
        await expect(page.locator("#displayed-text")).toBeHidden();
        page.on('dialog', dialog=> dialog.accept());
        await page.locator("#confirmbtn").click();

        await page.locator("#mousehover").hover();

        const framesPage = page.frameLocator("#courses-iframe");
        //to locate the element which is visible in the frame and click on it
        await framesPage.locator("li a[href*='lifetime-access']:visible").click(); 
        const textcheck = await framesPage.locator("div.text h2").textContent();
        console.log(textcheck.split(" ")[1]);

    });
    
    test('Screenshots', async ({ page }, testInfo) => {

        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        await expect(page.locator("#displayed-text")).toBeVisible();
        await page.locator("#displayed-text").screenshot({path: 'partialSS.png'})
        await page.locator("#hide-textbox").click();
        await expect(page.locator("#displayed-text")).toBeHidden();
        await page.screenshot({path: testInfo.outputPath('SS.png')});
//playwright supports pixel level ss comparision via toHaveScreenshot() method.
        await expect(page).toHaveScreenshot('.tests/MoreUITests.spec.js-snapshots/entireSS.png'); 

    });

    //SS comparision and visual comparision
    
    test('visual comparision', async({page})=>{
        await page.goto("https://www.google.com/");
        expect(await page.screenshot()).toMatchSnapshot('expected.png', {
        maxDiffPixelRatio: 0.02 // Allow up to 2% difference
    });

    })