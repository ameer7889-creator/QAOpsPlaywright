import { test as base } from '@playwright/test';

interface TestDataForOrder {
    username: string;
    password: string;
    product: string;

}
export const customTest = base.extend<{ testDataForOrder: TestDataForOrder }>(
    {
        testDataForOrder: {
            username: "ameer.4080@gmail.com",
            password: "Password$123",
            product: "iphone 13 pro"
        }
    });
