@api
Feature: Login API

  Scenario: API-008 Execute invalid login request
    Given user submits invalid login credentials
    Then login API should return invalid credential message