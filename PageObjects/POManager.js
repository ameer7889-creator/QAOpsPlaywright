const { LoginPage } = require('../PageObjects/LoginPage');
const { DashboardPage } = require('../PageObjects/DashboardPage');
const { CartPage } = require('../PageObjects/CartPage');
const { CheckoutPage } = require('../PageObjects/CheckoutPage');
const { ThankyouPage } = require('../PageObjects/ThankyouPage');
const { OrderdetailsPage } = require('../PageObjects/OrderdetailsPage');

class POManager {

    constructor(page) {
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
    getThankyouPage(){
        return this.thankyouPage;
    }
    getOrderdetailsPage(){
        return this.orderdetailsPage;
    }
}
module.exports = { POManager };