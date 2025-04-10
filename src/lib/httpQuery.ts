import ky, { HTTPError } from "ky";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { Options } from "ky";

interface CustomErrorResponse {
  status: number;
  data: unknown;
}

/**
 * Custom base query using ky HTTP client
 * @param baseOptions - Default ky options to be applied to all requests
 */
export const httpQuery = (
  baseOptions: Options = {}
): BaseQueryFn<
  {
    url: string;
    method: "get" | "post" | "put" | "patch" | "delete";
    data?: unknown;
    params?: Record<string, string>;
    headers?: Record<string, string>;
  },
  unknown,
  CustomErrorResponse
> => {
  return async ({ url, method, data, params, headers }) => {
    try {
      // Create ky instance with base configuration
      const api = ky.create({
        prefixUrl: process.env.NEXT_PUBLIC_BASE_URL,
        ...baseOptions,
      });

      const token =
        localStorage.getItem("token") ?? process.env.NEXT_PUBLIC_BASE_TOKEN;

      // Prepare request options
      const options: Options = {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...headers,
        },
        searchParams: params,
      };

      // Add body for non-GET requests
      if (method !== "get" && data) {
        options.json = data;
      }

      // Make the request
      const response = await api(url, options);
      const result = await response.json();

      return { data: result };
    } catch (error) {
      // Handle ky HTTPError
      if (error instanceof HTTPError) {
        return {
          error: {
            status: error.response.status,
            data: await error.response.json().catch(() => ({
              message: error.message,
            })),
          },
        };
      }

      // Handle unknown error
      return {
        error: {
          status: 500,
          data: { message: "An unexpected error occurred" },
        },
      };
    }
  };
};
