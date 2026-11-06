const base = require('@playwright/test');
const {request} = require('@playwright/test');
const {APIUtils} = require('./APIUtils.js');
const { use } = require('react');

const loginPayload = {userEmail:"ameer.7889@gmail.com",userPassword:"Password$123"};
const orderPayLoad = {orders:[{country:"Iran",productOrderedId:"6960eac0c941646b7a8b3e68"}]};

//creating a custom fixture
exports.customtest = base.test.extend({
    //name of the fixture
    authenticatedPage: async ({browser}, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/client/");
        await page.getByPlaceholder("email@example.com").fill("ameer.7889@gmail.com");
        await page.locator("#userPassword").fill("Password$123");
        await page.getByRole("button", { name: 'login' }).click();
        //using wait for load state to load network to grab all the titles of products
        await page.waitForLoadState('networkidle');
        await use(page);

        //teardown
        await context.close();

    },
    createOrder: async({}, use)=>
    {
        const apiContext = await request.newContext();
        const apiUtils = new APIUtils(apiContext,loginPayload);
        const response = await apiUtils.createOrder(orderPayLoad);
        await use(response);
        //teardown
        await apiContext.dispose();
    },

    testDataForOrder :
    {
        productName : 'Adidas Original'
    }
});