import {
  FullfilledInterceptor,
  interceptorHanlder,
  RejectedInterceptor,
} from "../types/interceptorType.ts";

export class InterceptorManager<T> {
  public handlers: (interceptorHanlder<T> | null)[] = [];

  use(fullfilled: FullfilledInterceptor<T>, rejected?: RejectedInterceptor) {
    this.handlers.push({ fullfilled, rejected });
    return this.handlers.length - 1;
  }

  eject(id: number): void {
    if (this.handlers[id]) this.handlers[id] = null;
  }
}
