@ui
@regression
Feature: Products Module

    Background:
        Given user opens the homepage

    @smoke
    Scenario: Open products grid view successfully

        When user clicks on products link

        Then products page should open successfully

        And products grid should be visible

        And product items should be displayed


    @smoke
Scenario: Open specific product details successfully

    When user clicks on products link

    And user opens first product details page

    Then product detail page should open successfully

    And product name should be visible

    And product price should be visible

    And product availability should be visible

    And product condition should be visible

    And product brand should be visible

@ui
@regression
Scenario: Search product successfully

    Given user opens the homepage

    When user clicks on products link

    And user searches for product "Blue Top"

    Then searched products should be visible

    And searched product "Blue Top" should appear in results

@ui
@regression
Scenario: Search invalid product successfully

    Given user opens the homepage

    When user clicks on products link

    And user searches for product "InvalidProduct123"

    Then no searched products should be visible

    And no products should be displayed

@ui
@regression
Scenario: Filter products by brand successfully

    Given user opens the homepage

    When user clicks on products link

    And user selects brand "Polo"

    Then brand products page should open successfully

    And products related to brand "Polo" should be visible

@ui
@regression
Scenario: Add product to cart successfully

    Given user opens the homepage

    When user clicks on products link

    And user adds first product to cart

    And user navigates to cart page

    Then added product should be visible in cart