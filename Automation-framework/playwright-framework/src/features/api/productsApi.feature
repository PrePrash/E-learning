Feature: Products API

  @api
  Scenario: API-001 Execute GET products list
    Given user sends GET products list request
    Then products response should contain array structure

  @api
  Scenario: API-002 Execute invalid POST products request
    Given user sends invalid POST products request
    Then products API should return method not allowed

  @api
  Scenario: API-005 Execute search product request
    Given API user searches for product "Top"
    Then matching products should be returned

  @api
  Scenario: API-006 Execute search without parameter
    Given user searches product without mandatory parameter
    Then search API should return validation error