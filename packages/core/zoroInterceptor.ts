import { Zoro } from "./zoroHttp.js";
import { InterceptorManager } from "./zoroInterceptorManager.js";

export class Interceptor extends Zoro {
  public interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager(),
  };
}
