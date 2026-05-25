import {
  Given,
  Then,
} from "@cucumber/cucumber";

import {
  expect,
  APIResponse,
} from "@playwright/test";

import { ApiClient } from "../../api/clients/ApiClient";

import { AuthService } from "../../api/services/AuthService";

let response: APIResponse;

const apiClient =
  new ApiClient();

const authService =
  new AuthService(apiClient);

Given(
  "user submits invalid login credentials",
  async function () {

    await apiClient.init();

    response =
      await authService.verifyLogin(
        "invalid@gmail.com",
        "wrongpassword",
      );
  },
);

Then(
  "login API should return invalid credential message",
  async function () {

    const responseBody =
      await response.json();

    console.log(responseBody);

    expect(
      responseBody.responseCode,
    ).toBe(404);

    expect(
      responseBody.message,
    ).toContain(
      "User not found",
    );
  },
);