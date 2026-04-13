export type FullfilledInterceptor<T> = (value: T) => T | Promise<T>;

export type RejectedInterceptor = (error: unknown) => unknown;

export interface interceptorHandler<T> {
  fullfilled: FullfilledInterceptor<T>;
  rejected?: RejectedInterceptor;
}
