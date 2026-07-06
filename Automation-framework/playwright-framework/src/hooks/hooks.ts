// src/hooks/hooks.ts  (the API hook)
import { Before, After } from "@cucumber/cucumber";
import { ApiClient } from "../api/clients/ApiClient";
import { CustomWorld } from "./world";

Before(async function (this: CustomWorld) {
  // Init the API client — this fetches the CSRF token
  this.apiClient = new ApiClient();
  await this.apiClient.init();
});

After(async function (this: CustomWorld) {
  await this.apiClient?.context?.dispose?.();
})