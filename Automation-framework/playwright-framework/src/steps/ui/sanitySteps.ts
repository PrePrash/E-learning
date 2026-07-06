import { Given, Then } from "@cucumber/cucumber";

import { expect } from "@playwright/test";

import { BasePage } from "../../pages/BasePage";

import { config } from "../../../config/env";

import { CustomWorld } from "../../hooks/world";

let basePage: BasePage;

Given(
  "user launches the application",
  async function (this: CustomWorld) {

    basePage = new BasePage(this.page);

    await basePage.navigateTo(
      config.baseUrl,
    );
  },
);

Then(
  "homepage should load successfully",
  async function (this: CustomWorld) {

    await expect(this.page).toHaveURL(
      /automationexercise/,
    );
  },
);