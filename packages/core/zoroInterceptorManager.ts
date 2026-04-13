import {
  FullfilledInterceptor,
  interceptorHandler,
  RejectedInterceptor,
} from "../types/interceptorType.js";

export class InterceptorManager<T> {
  public handlers: (interceptorHandler<T> | null)[] = [];

  use(fullfilled: FullfilledInterceptor<T>, rejected?: RejectedInterceptor) {
    this.handlers.push({ fullfilled, rejected });
    return this.handlers.length - 1;
  }

  eject(id: number): void {
    if (this.handlers[id]) this.handlers[id] = null;
  }
}
