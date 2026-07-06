import {
  APIRequestContext,
  APIResponse,
  request,
} from "@playwright/test";

import { config } from "../../../config/env";

export class ApiClient {
  private requestContext!: APIRequestContext;

  async init(): Promise<void> {
    this.requestContext =
      await request.newContext({
        baseURL: config.apiBaseUrl,
        extraHTTPHeaders: {
          Accept: "application/json",
        },
      });
  }

async get(
  endpoint: string,
): Promise<APIResponse> {

  return await this.requestContext.get(
    `/api${endpoint}`,
  );
}
async post(
  endpoint: string,
  payload?: Record<string, string>,
): Promise<APIResponse> {

  return await this.requestContext.post(
    `/api${endpoint}`,
    {
      form: payload,
    },
  );
}
async put(
  endpoint: string,
  payload?: Record<string, string>,
): Promise<APIResponse> {

  return await this.requestContext.put(
    `/api${endpoint}`,
    {
      form: payload,
    },
  );
}
async delete(
  endpoint: string,
  payload?: Record<string, string>,
): Promise<APIResponse> {

  return await this.requestContext.delete(
    `/api${endpoint}`,
    {
      form: payload,
    },
  );
}
  get context() {
    return this.requestContext;
  }
}