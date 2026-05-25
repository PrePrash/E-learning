import {
  Given,
  When,
  Then,
} from "@cucumber/cucumber";

import {
  expect,
  APIResponse,
} from "@playwright/test";

import { ApiClient } from "../../api/clients/ApiClient";

import { UserService } from "../../api/services/UserService";

import { generateUserDataForAPI } from "../../utils/fakerUtils";

let response: APIResponse;

const apiClient =
  new ApiClient();

const userService =
  new UserService(apiClient);

const userData =
  generateUserDataForAPI();

Given(
  "user creates new account",
  async function () {

    await apiClient.init();

    response =
      await userService.createUser(
        userData,
      );

    const responseBody =
      await response.json();

    console.log(responseBody);

    expect(
      responseBody.responseCode,
    ).toBe(201);
  },
);

When(
  "user updates existing account",
  async function () {

    response =
      await userService.updateUser(
        userData,
      );

    const responseBody =
      await response.json();

    console.log(responseBody);

    expect(
      responseBody.responseCode,
    ).toBe(200);
  },
);

When(
  "user fetches account details by email",
  async function () {

    response =
      await userService.getUserByEmail(
        userData.email,
      );

    const responseBody =
      await response.json();

    console.log(responseBody);

    expect(
      responseBody.user.email,
    ).toBe(
      userData.email,
    );
  },
);

Then(
  "user deletes account successfully",
  async function () {

    response =
      await userService.deleteUser(
        userData.email,
        userData.password,
      );

    const responseBody =
      await response.json();

    console.log(responseBody);

    expect(
      responseBody.responseCode,
    ).toBe(200);
  },
);