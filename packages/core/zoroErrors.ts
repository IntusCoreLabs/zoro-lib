import type { ZoroResponse } from "../types/zoroErrorType.ts";
/**
 * @param message - the message is the type of error we will define when our request fails or something happens along the way.
 * @param ZoroResponse - zoroResponse is a dataset that will provide us with even more information when one of our requests is canceled, fails, or remains pending. It includes `data`, which is a generic `T` that will be the error returned based on the data type of our request; `message`, which is the error returned by the server based on the type of failure; and finally, the status code, which will tell us exactly why it failed based on the code.
 * @param code - code is an optional code that can implement a status code outside of the zoroResponse type
 *
 * @author watercubz
 */

export class ZoroError<T> extends Error {
  public readonly code?: number;
  public readonly response: ZoroResponse<T>;

  constructor(message: string, response: ZoroResponse<T>, code?: number) {
    super(message);
    this.name = "ZoroError";
    this.response = response;
    this.code = code;

    Object.setPrototypeOf(this, ZoroError.prototype);
  }

  get status() {
    return this.response.status;
  }
}
