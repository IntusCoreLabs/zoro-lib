/**
 * Represents the structured error response attached to a {@link ZoroError}.
 *
 * @typeParam T - The type of the response data returned by the server.
 */
export interface ZoroErrorResponse<T> {
  /** The parsed response body from the server, or a fallback value on parse failure. */
  data: T;
  /** A human-readable error message describing the failure. */
  message: string;
  /** The HTTP status code returned by the server (0 for network/timeout errors). */
  status: number;
}
