const { test: base } = require('@playwright/test');

exports.customtest = base.extend(
{
    testDataForOrder: {
        username: "ameer.4080@gmail.com",
        password: "Password$123",
        product: "iphone 13 pro"
    }
});
