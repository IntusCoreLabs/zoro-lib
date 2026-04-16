import { Zoro } from "./zoroHttp.js";
import { InterceptorManager } from "./zoroInterceptorManager.js";

/**
 * Extends the base {@link Zoro} HTTP client with request/response interceptor support.
 * Interceptors allow transforming outgoing requests and incoming responses
 * before they reach the caller.
 */
export class Interceptor extends Zoro {
  public interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager(),
  };
}
