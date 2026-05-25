// src/utils/responseParser.ts
import { APIResponse } from "@playwright/test";

export async function parseApiResponse<T>(response: APIResponse): Promise<T> {
  const text = await response.text();
  const status = response.status();

  // Guard against HTML error pages (CSRF failures, 500s etc.)
  if (
    text.trimStart().startsWith("<!DOCTYPE") ||
    text.trimStart().startsWith("<html")
  ) {
    if (status === 403) {
      throw new Error(
        `[API 403] CSRF token missing or invalid.\n` +
        `Snippet: ${text.substring(0, 200)}`
      );
    }
    throw new Error(
      `[API ${status}] Expected JSON but received HTML.\n` +
      `Snippet: ${text.substring(0, 200)}`
    );
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(
      `[API ${status}] Invalid JSON Response:\n${text.substring(0, 300)}`
    );
  }
}