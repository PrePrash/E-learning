@ui
@regression
Feature: Authentication Module

    Background:
        Given user opens the homepage

    @smoke
    Scenario: Navigate cleanly to signup login functional layout

        When user clicks on signup login link

        Then login page should open successfully

        And login form should be visible

        And signup form should be visible

    @smoke
Scenario: Register new user successfully

    When user clicks on signup login link

    And user registers with dynamic credentials

    Then account should be created successfully

    And logged in username should be visible
    
    @smoke
Scenario: Login with valid credentials successfully

    When user clicks on signup login link

    And user logs in with valid credentials

    Then logged in username should be visible

    And logout button should be visible

@smoke
Scenario: Login with invalid credentials

    When user clicks on signup login link

    And user logs in with invalid credentials

    Then login error message should be visible

    And user should remain on login page

@smoke
Scenario: Logout user successfully

    When user clicks on signup login link

    And user logs in with valid credentials

    And user clicks logout button

    Then user should be redirected to login page

    And logged in username should not be visible