import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";
import { CustomWorld } from "../support/world";

// ---------- Given ----------
Given("I set header {string} to {string}", function (this: CustomWorld, key: string, value: string) {
  this.headers[key] = value;
});

Given("I set request body to:", function (this: CustomWorld, body: string) {
  this.requestBody = JSON.parse(body);
});

Given("I am logged in", async function (this: CustomWorld) {
  await this.authenticate();
});

// ---------- When ----------
When("I send a {word} request to {string}", async function (this: CustomWorld, method: string, path: string) {
  await this.sendRequest(method, path);
});

// ---------- Then ----------
Then("the response status should be {int}", function (this: CustomWorld, expectedStatus: number) {
  expect(this.response?.status).to.equal(expectedStatus);
});

Then("the response should contain {string}", function (this: CustomWorld, key: string) {
  expect(this.response?.data).to.have.property(key);
});
