Feature: E-Commerce validations

    @Regression
    Scenario: Placing the order
        Given : Login to Ecommerce application with "ameer.7889@gmail.com" and "Password$123"
        When : Add "iphone 13 pro" to cart
        Then : Verify "samsung" is displayed in the cart
        When : Enter all valid details and place the order
        Then : Verify the order details in the order details page

     @ErrorValidations
    Scenario Outline: Placing the order
        Given : Login to Ecommerce2 application with "<username>" and "<password>"
        Then : Verify error message is displayed

        Examples:
            | username              | passord       |
            | ameer.test@gmail.com  | password@123  |
            | abcd123@yahoo.com     | dumy$12334    |