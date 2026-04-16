import type { ZoroErrorResponse } from "../types/zoroErrorType.ts";

/**
 * Custom error class thrown by the Zoro HTTP client on failed requests.
 *
 * Wraps the standard `Error` with a structured {@link ZoroErrorResponse} containing
 * the server-provided data, a human-readable message, and the HTTP status code.
 * This allows consumers to inspect both the error message and the full response
 * context when handling failures.
 *
 * @typeParam T - The type of the response data attached to this error.
 * @author watercubz
 *
 * @example
 * ```ts
 * try {
 *   await api.get("/users/999");
 * } catch (err) {
 *   if (err instanceof ZoroError) {
 *     console.log(err.status);           // 404
 *     console.log(err.response.message);  // "http: Not Found"
 *   }
 * }
 * ```
 */
export class ZoroError<T> extends Error {
  /** Optional application-level error code, independent of the HTTP status. */
  public readonly code?: number;
  /** Structured response containing data, message, and HTTP status. */
  public readonly response: ZoroErrorResponse<T>;

  /**
   * @param message - A short description of the error (e.g. "http 404: Not Found").
   * @param response - The structured response with data, message, and status code.
   * @param code - An optional application-level error code.
   */
  constructor(message: string, response: ZoroErrorResponse<T>, code?: number) {
    super(message);
    this.name = "ZoroError";
    this.response = response;
    this.code = code;

    Object.setPrototypeOf(this, ZoroError.prototype);
  }

  /** Returns the HTTP status code from the response (shorthand for `response.status`). */
  get status() {
    return this.response.status;
  }
}
