Feature: MOT History API 

  Scenario: User sees quota and rate limits in documentation
    Given the user navigates to the MOT History API documentation homepage
    When the user opens the "Rate limits" section
    Then the documentation should display the quota limit
    And the quota limit should state "500000"

  Scenario: User views reasons for rejected API applications
    Given the user navigates to the MOT History API documentation homepage
    When the user opens the "Support" section
    Then the documentation should display reasons why an API application may be rejected
    And the reasons should include "no contact email provided"
    And the reasons should include "a postal address that cannot be recognised"
    And the reasons should include "an organisation, business or individual already being registered to use the API"

  Scenario: User can navigate back to the previous page
    Given the user navigates to the MOT History API documentation homepage
    When the user opens the "Rate limits" section
    And the user navigates back
    Then the user should see the MOT History API documentation homepage

  Scenario: User can navigate back to the homepage from a section
    Given the user navigates to the MOT History API documentation homepage
    When the user opens the "Support" section
    And the user clicks the Home link
    Then the user should see the MOT History API documentation homepage

  Scenario: Verify error code MOTH-NP-01 description
    Given the user navigates to the MOT History API documentation homepage
    When the user opens the "Error codes" section
    And the user searches for error code "MOTH-NP-01"
    Then the error code should be present in the error codes table
    And the description should be "DVLA ID is required but has not been provided in the request"