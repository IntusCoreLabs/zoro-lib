import {
  FulfilledInterceptor,
  InterceptorHandler,
  RejectedInterceptor,
} from "../types/interceptorType.js";

/**
 * Manages a stack of interceptor handlers for requests or responses.
 * Handlers are executed in registration order and can be removed (ejected) by ID.
 *
 * @typeParam T - The value type flowing through the interceptor chain.
 */
export class InterceptorManager<T> {
  public handlers: (InterceptorHandler<T> | null)[] = [];

  /**
   * Registers a new interceptor handler.
   *
   * @param fulfilled - Callback invoked when the operation succeeds.
   * @param rejected - Optional callback invoked when the operation fails.
   * @returns A numeric ID that can be passed to {@link eject} to remove the handler.
   */
  use(fulfilled: FulfilledInterceptor<T>, rejected?: RejectedInterceptor) {
    this.handlers.push({ fulfilled, rejected });
    return this.handlers.length - 1;
  }

  /**
   * Removes a previously registered interceptor by its ID.
   * After ejection the slot is set to `null` so handler indices remain stable.
   *
   * @param id - The handler ID returned by {@link use}.
   */
  eject(id: number): void {
    if (this.handlers[id]) this.handlers[id] = null;
  }
}
