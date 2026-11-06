//const { LoginPage } = require('../PageObjects/loginPage'); - Java Script
import { LoginPage } from './LoginPage'; //For Type Script
import { DashboardPage } from './DashboardPage';
import { CartPage } from './CartPage';
import { CheckoutPage } from './CheckoutPage';
import { ThankyouPage } from './ThankyouPage';
import { OrderdetailsPage } from './OrderdetailsPage';
import { Page } from '@playwright/test';

export class POManager {

    //type declaration for the objects

    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    thankyouPage: ThankyouPage;
    orderdetailsPage: OrderdetailsPage;
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.thankyouPage = new ThankyouPage(page);
        this.orderdetailsPage = new OrderdetailsPage(page);

    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage
    }

    getCartPage() {
        return this.cartPage;
    }
    getCheckoutPage() {
        return this.checkoutPage;
    }
    getThankyouPage() {
        return this.thankyouPage;
    }
    getOrderdetailsPage() {
        return this.orderdetailsPage;
    }
}
