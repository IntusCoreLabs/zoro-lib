interface ZoroResponse<T> {
  data: T;
  message: string;
  status: number;
}

export class ZoroError<T> extends Error {
  public readonly status: string | number;
  public readonly response: ZoroError<T>;

  constructor(
    message: string,
    status: string | number,
    response: ZoroError<T>,
  ) {
    super(message);
    this.name = "ZoroError";
    this.status = status;
    this.response = response;

    Object.setPrototypeOf(this, ZoroError.prototype);
  }

  get status() {
    return this.response.status;
  }
}
