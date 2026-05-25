import {
  Given,
  Then,
} from "@cucumber/cucumber";
import { When } from "@cucumber/cucumber";
import {
  expect,
  APIResponse,
} from "@playwright/test";

import { ApiClient } from "../../api/clients/ApiClient";

import { ProductService } from "../../api/services/ProductService";

import { ProductsResponse } from "../../api/interfaces/product.interface";

let response: APIResponse;

const apiClient = new ApiClient();

const productService =
  new ProductService(apiClient);

Given(
  "user sends GET products list request",
  async function () {
    await apiClient.init();

    response =
      await productService.getProductsList();
  },
);

Then(
  "products response should contain array structure",
  async function () {
    expect(
      response.status(),
    ).toBe(200);

    const responseBody: ProductsResponse =
      await response.json();

    expect(
      responseBody.responseCode,
    ).toBe(200);

    expect(
      Array.isArray(
        responseBody.products,
      ),
    ).toBeTruthy();

    expect(
      responseBody.products.length,
    ).toBeGreaterThan(0);
  },
);
Given(
  "user sends invalid POST products request",
  async function () {

    await apiClient.init();

    response =
      await productService.invalidPostProducts();
  },
);

Then(
  "products API should return method not allowed",
  async function () {

    expect(
      response.status(),
    ).toBe(200);

    const responseBody =
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
Given(
  "API user searches for product {string}",
  async function (
    product: string,
  ) {

    await apiClient.init();

    response =
      await productService.searchProduct(
        product,
      );
  },
);

Then(
  "matching products should be returned",
  async function () {

    expect(
      response.status(),
    ).toBe(200);

    const responseBody: ProductsResponse =
      await response.json();

    expect(
      responseBody.responseCode,
    ).toBe(200);

    expect(
      Array.isArray(
        responseBody.products,
      ),
    ).toBeTruthy();

    expect(
      responseBody.products.length,
    ).toBeGreaterThan(0);
  },
);
Given(
  "user searches product without mandatory parameter",
  async function () {

    await apiClient.init();

    response =
      await productService.searchWithoutParameter();
  },
);

Then(
  "search API should return validation error",
  async function () {

    expect(
      response.status(),
    ).toBe(200);

    const responseBody =
      await response.json();

    expect(
      responseBody.responseCode,
    ).toBe(400);

    expect(
      responseBody.message,
    ).toContain(
      "Bad request",
    );
  },
);