import { test, expect, Locator, Page } from '@playwright/test';
export class LoginPage {

    page: Page;
    userName: Locator;
    password: Locator;
    signInButton: Locator;


    constructor(page:Page) {
        this.page = page;
        this.signInButton = page.getByRole("button", {name: 'login'});
        this.userName = page.getByPlaceholder("email@example.com");
        this.password = page.locator("#userPassword");
    }

    async navigateTo() {
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }
    async validLogin(username:string, password:string) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState("networkidle");
    }
}