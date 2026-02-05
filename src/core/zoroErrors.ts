import { ZoroResponse } from "../types/zoroErrorType.js";

export class ZoroError<T> extends Error {
  public readonly status: string | number;
  public readonly response: ZoroResponse<T>;

  constructor(
    message: string,
    status: string | number,
    response: ZoroResponse<T>,
  ) {
    super(message);
    this.name = "ZoroError";
    this.response = response;

    Object.setPrototypeOf(this, ZoroError.prototype);
  }
}
