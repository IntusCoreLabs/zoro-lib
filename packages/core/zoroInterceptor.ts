import { Zoro } from "./zoroHttp.ts";
import { InterceptorManager } from "./zoroInterceptorManager.ts";

export class Interceptor extends Zoro {
  public interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager(),
  };
}
