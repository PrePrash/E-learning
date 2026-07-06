import {
  Given,
  Then,
} from "@cucumber/cucumber";

import {
  expect,
  APIResponse,
} from "@playwright/test";

import { ApiClient } from "../../api/clients/ApiClient";

import { BrandService } from "../../api/services/BrandService";

import { BrandsResponse } from "../../api/interfaces/brand.interface";
import { ApiMessageResponse } from "../../api/interfaces/apiResponse.interface";
let response: APIResponse;

const apiClient = new ApiClient();

const brandService =
  new BrandService(apiClient);

Given(
  "user sends GET brands list request",
  async function () {

    await apiClient.init();

    response =
      await brandService.getBrandsList();
  },
);

Then(
  "brands should be populated",
  async function () {

    expect(
      response.status(),
    ).toBe(200);

    const responseBody: BrandsResponse =
      await response.json();

    expect(
      responseBody.responseCode,
    ).toBe(200);

    expect(
      Array.isArray(
        responseBody.brands,
      ),
    ).toBeTruthy();

    expect(
      responseBody.brands.length,
    ).toBeGreaterThan(0);
  },
);
Given(
  "user sends invalid PUT brands request",
  async function () {

    await apiClient.init();

    response =
      await brandService.invalidPutBrands();
  },
);

Then(
  "brands API should return error message",
  async function () {

    expect(
      response.status(),
    ).toBe(200);

    const responseBody: ApiMessageResponse =
      await response.json();

    expect(
      responseBody.responseCode,
    ).toBe(405);

    expect(
      responseBody.message,
    ).toContain(
      "This request method is not supported",
    );
  },
);