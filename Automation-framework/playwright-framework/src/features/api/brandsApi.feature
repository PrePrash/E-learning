Feature: Brands API

  @api
  Scenario: API-003 Execute GET brands list
    Given user sends GET brands list request
    Then brands should be populated

  @api
  Scenario: API-004 Execute invalid PUT brands request
    Given user sends invalid PUT brands request
    Then brands API should return error message