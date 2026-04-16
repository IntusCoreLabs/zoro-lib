/**
 * Configuration options for creating a Zoro HTTP client instance.
 *
 * @example
 * ```ts
 * const client = zoro({
 *   baseUrl: "https://api.example.com",
 *   timeout: 10_000,
 *   headers: { "Authorization": "Bearer token" },
 * });
 * ```
 */
export interface ZoroConfig {
  /** The base URL prepended to every request endpoint (e.g. "https://api.example.com"). */
  baseUrl: string;
  /** Request timeout in milliseconds. Defaults to 30 000 ms (30 seconds). */
  timeout?: number;
  /** Default headers sent with every request. Per-request headers (like Content-Type) are merged automatically. */
  headers?: Record<string, string>;
}
