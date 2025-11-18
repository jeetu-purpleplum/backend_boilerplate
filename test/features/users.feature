# @auth
Feature: Users API

  Background:
    Given I set header "Content-Type" to "application/json"
    # And I am logged in

  Scenario: Get all users
    When I send a GET request to "/users"
    Then the response status should be 200
    And the response should contain "data"

  Scenario: Create a new user
    Given I set request body to:
      """
      { "email": "test@example.com", "password": "123456" }
      """
    When I send a POST request to "/users"
    Then the response status should be 201
    And the response should contain "email"
