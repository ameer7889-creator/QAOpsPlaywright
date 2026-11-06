Feature: Error validations

    @ErrorValidations
    Scenario Outline: Placing the order
        Given : Login to Ecommerce2 application with "<username>" and "<password>"
        Then : Verify error message is displayed

        Examples:
            | username              | passord       |
            | ameer.test@gmail.com  | password@123  |
            | abcd123@yahoo.com     | dumy$12334    |