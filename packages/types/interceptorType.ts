/**
 * Callback invoked when a request or response is fulfilled successfully.
 * Can return a transformed value or a promise that resolves to one.
 *
 * @typeParam T - The value type being intercepted.
 */
export type FulfilledInterceptor<T> = (value: T) => T | Promise<T>;

/**
 * Callback invoked when a request or response is rejected (errored).
 * Receives the error and can return a recovery value or re-throw.
 */
export type RejectedInterceptor = (error: unknown) => unknown;

/**
 * A pair of callbacks registered with an {@link InterceptorManager}.
 *
 * @typeParam T - The value type being intercepted.
 */
export interface InterceptorHandler<T> {
  /** Called on success. */
  fulfilled: FulfilledInterceptor<T>;
  /** Called on failure. If omitted, the error propagates unchanged. */
  rejected?: RejectedInterceptor;
}
