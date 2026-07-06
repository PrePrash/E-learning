@ui
@regression
Feature: Homepage Validation

    Background:
        Given user opens the homepage

    @smoke
    Scenario: Verify homepage elements and layout sections

        Then homepage logo should be visible
        And Verify homepage carousel banner is visible
        And Verify category section displays all main categories
        And category section should be visible
        And featured items section should be visible
        And footer section should be visible

    @smoke
    Scenario: Validate main global header navigation accessibility

        Then all header navigation links should be visible

    @regression
    Scenario: Verify header navigation links are visible

        Then signup login link should be visible
        And products link should be visible

