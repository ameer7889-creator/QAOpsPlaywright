import { test, expect, Locator, Page } from '@playwright/test';
export class CartPage {

    cartProducts: Locator;
    productsText: Locator;
    cart: Locator;
    orders: Locator;
    checkout: Locator;
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        this.checkout = page.locator("text=Checkout");

    }

    async VerifyProductIsDisplayed(productName: String) {

        await this.cartProducts.waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        //expect(bool).toBeTruthy();

    }

    getProductLocator(productName: String) {
        return this.page.locator("h3:has-text('" + productName + "')");
    }
    async Checkout() {
        await this.checkout.click();
    }

}


/*constructor(page)
    {
        this.listItems = page.locator("div li");
        this.item = page.locator("h3:has-text('productName')");
        this.checkout = page.locator("text='Checkout'");



    }

async confirmItemGoToCheckout(productName,expect){

    await this.listItems.first().waitFor();
    const bool = await this.item.isVisible();
    //expect(bool).toBeTruthy();
    await this.checkout.click();

}*/