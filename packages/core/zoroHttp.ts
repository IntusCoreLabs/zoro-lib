import type { ZoroHttpMethod } from "../types/zoroHttpType.ts";
import type { ZoroConfig } from "../types/zoroConfigType.ts";
import { ZoroError } from "./zoroErrors.js";

const DEFAULT_TIMEOUT = 30_000;

export class Zoro {
  private baseUrl: string;
  private timeout: number;
  private headers: Record<string, string>;

  constructor(config: ZoroConfig) {
    this.baseUrl = config.baseUrl;
    this.timeout = config.timeout ?? DEFAULT_TIMEOUT;
    this.headers = config.headers ?? {};
  }

  /**
   * Constructs the full URL by joining the base URL with the given endpoint.
   * Validates that the endpoint is a relative path to prevent SSRF attacks.
   *
   * @param endpoint - A relative path to append to the base URL (e.g. "/users/1").
   * @returns The full URL string.
   * @throws {Error} If the endpoint contains "://" indicating an absolute URL injection attempt.
   */
  private buildUrl(endpoint: string): string {
    if (endpoint.includes("://")) {
      throw new Error("Endpoint must be a relative path, not an absolute URL");
    }
    return `${this.baseUrl}${endpoint}`;
  }

  /**
   * Executes an HTTP request using the native Fetch API.
   *
   * Builds the full URL from the base URL and the endpoint, attaches configured headers,
   * serializes the body as JSON when present, and enforces a configurable timeout via
   * {@link AbortSignal.timeout}. The response is parsed as JSON; non-2xx status codes
   * and network/timeout failures are rejected with a {@link ZoroError}.
   *
   * @typeParam T - The expected shape of the parsed JSON response body.
   * @typeParam D - The type of the request body payload (defaults to `unknown`).
   * @param method - The HTTP verb to use (GET, POST, PUT, PATCH, DELETE).
   * @param endpoint - A relative path appended to the base URL (e.g. "/users").
   * @param data - Optional request body; will be serialized with `JSON.stringify`.
   * @returns A promise that resolves with the parsed response body typed as `T`.
   * @throws {ZoroError} On HTTP errors (status >= 300), network failures, timeouts,
   *   or when the response body is not valid JSON.
   * @throws {Error} If the endpoint is an absolute URL (SSRF protection).
   */
  private async request<T, D = unknown>(
    method: ZoroHttpMethod,
    endpoint: string,
    data?: D,
  ): Promise<T> {
    const url = this.buildUrl(endpoint);

    const headers: Record<string, string> = { ...this.headers };

    if (data !== undefined) {
      headers["Content-Type"] = "application/json";
    }

    let response: Response;
    try {
      response = await fetch(url, {
        method,
        headers,
        body: data !== undefined ? JSON.stringify(data) : undefined,
        signal: AbortSignal.timeout(this.timeout),
      });
    } catch (err) {
      if (err instanceof DOMException && err.name === "TimeoutError") {
        throw new ZoroError<null>("Request Timeout", {
          message: `Request timed out after ${this.timeout}ms`,
          data: null,
          status: 0,
        });
      }
      throw new ZoroError<null>("Network Error", {
        message: err instanceof Error ? err.message : "Network Error",
        data: null,
        status: 0,
      });
    }

    if (response.ok) {
      const text = await response.text();
      if (!text) {
        return null as T;
      }
      try {
        return JSON.parse(text) as T;
      } catch {
        throw new ZoroError<string>("Invalid JSON response", {
          message: "Failed to parse response as JSON",
          data: text,
          status: response.status,
        });
      }
    }

    let errorData: unknown;
    try {
      errorData = await response.json();
    } catch {
      errorData = await response.text().catch(() => null);
    }

    throw new ZoroError<unknown>(`http ${response.status}: ${response.statusText}`, {
      message: `http: ${response.statusText}`,
      data: errorData,
      status: response.status,
    });
  }

  /**
   * Sends an HTTP GET request.
   *
   * @typeParam T - The expected shape of the response body.
   * @param url - The endpoint path relative to the base URL.
   * @returns A promise that resolves with the parsed response body.
   */
  public get<T>(url: string): Promise<T> {
    return this.request<T>("GET", url);
  }

  /**
   * Sends an HTTP POST request with a JSON body.
   *
   * @typeParam T - The expected shape of the response body.
   * @typeParam D - The type of the request payload.
   * @param url - The endpoint path relative to the base URL.
   * @param data - The request body to send, serialized as JSON.
   * @returns A promise that resolves with the parsed response body.
   */
  public post<T, D>(url: string, data: D): Promise<T> {
    return this.request<T>("POST", url, data);
  }

  /**
   * Sends an HTTP PATCH request with a JSON body for partial updates.
   *
   * @typeParam T - The expected shape of the response body.
   * @typeParam D - The type of the request payload.
   * @param url - The endpoint path relative to the base URL.
   * @param data - The partial update payload, serialized as JSON.
   * @returns A promise that resolves with the parsed response body.
   */
  public patch<T, D>(url: string, data: D): Promise<T> {
    return this.request<T, D>("PATCH", url, data);
  }

  /**
   * Sends an HTTP PUT request with a JSON body for full replacements.
   *
   * @typeParam T - The expected shape of the response body.
   * @typeParam D - The type of the request payload.
   * @param url - The endpoint path relative to the base URL.
   * @param data - The replacement payload, serialized as JSON.
   * @returns A promise that resolves with the parsed response body.
   */
  public put<T, D>(url: string, data: D): Promise<T> {
    return this.request<T>("PUT", url, data);
  }

  /**
   * Sends an HTTP DELETE request.
   *
   * @typeParam T - The expected shape of the response body.
   * @param url - The endpoint path relative to the base URL.
   * @returns A promise that resolves with the parsed response body.
   */
  public delete<T>(url: string): Promise<T> {
    return this.request<T>("DELETE", url);
  }
}
