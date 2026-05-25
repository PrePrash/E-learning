Feature: User Lifecycle API

  @api
  Scenario: API-007 Complete user lifecycle
    Given user creates new account
    When user updates existing account
    And user fetches account details by email
    Then user deletes account successfully