import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import { ApiClient } from "../api/clients/ApiClient";
import {
  Browser,
  BrowserContext,
  Page,
  APIRequestContext,
} from "@playwright/test";

export class CustomWorld extends World {
  browser!: Browser;

  context!: BrowserContext;

  page!: Page;

  request!: APIRequestContext;
 apiClient!: ApiClient;
  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
