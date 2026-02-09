import type { ZoroHttpMethod } from "../types/zoroHttpType.ts";
import { ZoroError } from "./zoroErrors.ts";
import { XMLHttpRequest } from "xmlhttprequest";

export class Zoro {
  private baseUrl: string;
  public version: string = "1.0.0";

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   *
   * @param method - zoro receives a method which will be associated with the type of request it wants to make, currently allowing GET, POST, PUT, DELETE
   * @param endpoint - the endpoint will be the URL associated with the prefix, that is, the base URL. If you make a request to https://my-api.com, then the endpoint will be what you want to access, for example, user/users.
   * @param data - data is a generic D, which is unknown since you don't know the data type or its order
   * @returns
   */
  private request<T, D = unknown>(
    method: ZoroHttpMethod,
    endpoint: string,
    data?: D,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, `${this.baseUrl}${endpoint}`);
      xhr.responseType = "json";

      if (data) {
        xhr.setRequestHeader("Content-Type", "application/json");
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          let body: unknown;

          const data = xhr.response || xhr.responseText;

          if (typeof data === "string") {
            body = JSON.parse(data);
          } else {
            body = data;
          }

          resolve(body as T);
        } else {
          reject(
            new ZoroError(`http ${xhr.status}: ${xhr.statusText}`, {
              message: `http: ${xhr.statusText}`,
              data: xhr.response,
              status: xhr.status,
            }),
          );
        }
      };

      xhr.onerror = () =>
        reject(
          new ZoroError("Network Error", {
            message: "Network Error",
            data: {},
            status: xhr.status,
          }),
        );

      xhr.send(data ? JSON.stringify(data) : null);
    });
  }

  public get<T>(url: string): Promise<T> {
    return this.request<T>("GET", url);
  }

  public post<T, D>(url: string, data: D): Promise<T> {
    return this.request<T>("POST", url, data);
  }

  public put<T, D>(url: string, data: D): Promise<T> {
    return this.request<T>("PUT", url, data);
  }

  public delete<T>(url: string): Promise<T> {
    return this.request<T>("DELETE", url);
  }

  public zoroVersion(): string {
    return this.version;
  }
}
