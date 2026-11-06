const {expect } = require('@playwright/test');

class ThankyouPage {

    constructor(page) {

        this.page = page;
        this.emailId = page.locator(".user__name [type='text']").first();
        this.thankYouMessage = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myOrdersButton = page.locator(page.locator("button[routerlink*='myorders']"));//label[routerlink*='myorders']")
        this.ordersTable = page.locator("tbody");

    }
    async ClickMyOrdersFromTYPage(){

        await this.myOrdersButton.click();
        await this.ordersTable.waitFor();
    }
}
module.exports = { ThankyouPage };