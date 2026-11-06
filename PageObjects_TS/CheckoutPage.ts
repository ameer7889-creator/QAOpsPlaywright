import { test, expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {

    page    : Page;
    country : Locator;
    dropdown: Locator;
    emailId : Locator;
    submit  : Locator;
    orderId : Locator;
    orderConfirmationText: Locator;


    constructor(page:Page) {
        this.page = page;
        this.country = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
        this.emailId = page.locator(".user__name [type='text']:nth-child(2)");
        this.submit = page.locator(".action__submit");
        this.orderConfirmationText = page.locator(".hero-primary");
        //this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.orderId = page.locator("td label[class='ng-star-inserted']");

    }

    async fillCardCoupon(CC:any, month:any, day:any, cvv:any, name:string, coupon:string, expectedCouponMsg:string) {
        //CC info
        await this.page.locator("//form/div/div[1]/div/input").fill(CC);
        await this.page.locator("select:nth-child(2)").selectOption(month);
        await this.page.locator("select:nth-child(3)").selectOption(day);
        await this.page.locator("//form/div/div[2]/div[2]/input").fill(cvv);
        await this.page.locator("form > div > div:nth-child(3) > div > input").fill(name);
        await this.page.locator("[name='coupon']").fill(coupon);

        //applying coupon and verifying the success message
        await this.page.getByRole('button', { name: 'Apply Coupon' }).click();
        const couponSuccessMsg = await this.page.locator("p[class*='mt-1']").textContent();
        console.log(couponSuccessMsg);
        expect(couponSuccessMsg).toContain(expectedCouponMsg);
    }

    async searchCountryAndSelect(countryCode:string, desiredName:string) {
        //select country
        await this.country.pressSequentially(countryCode, { delay: 150 });
        await this.dropdown.waitFor();
        const resultsCount = await this.dropdown.locator("button").count();

        for (let i = 0; i < resultsCount; ++i) {

            let countryName:any;
            countryName = await this.dropdown.locator("button").nth(i).textContent();
            if (countryName.trim() === desiredName)//there are other ways to do this if you have space in the name
            // if(countryName.trim()==='Inida') or if(countryName.includes("india"))
            {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }

    }

    async SubmitAndGetOrderId() {
        //selecting place order button
        await this.submit.click();
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
        return await this.orderId.textContent();

    }

    async VerifyEmailId(username:string) {
        await expect(this.emailId).toHaveValue(username, { timeout: 5000 });
    }

}