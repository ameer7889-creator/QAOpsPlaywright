import { test, expect, Locator, Page } from '@playwright/test';
export class ThankyouPage {

    page: Page;
    emailId: Locator;
    orderId: Locator;
    ordersTable: Locator;
    myOrdersButton: Locator;
    thankYouMessage: Locator;

    constructor(page: Page) {

        this.page = page;
        this.emailId = page.locator(".user__name [type='text']").first();
        this.thankYouMessage = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myOrdersButton = page.locator("button[routerlink*='myorders']");//label[routerlink*='myorders']")
        this.ordersTable = page.locator("tbody");

    }
    async ClickMyOrdersFromTYPage() {

        await this.myOrdersButton.click();
        await this.ordersTable.waitFor();
    }
}