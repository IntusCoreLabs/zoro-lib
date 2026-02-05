import { ZoroHttpMethod } from "../types/zoroHttpType.js";

export class Zoro {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private request<T, D = unknown>(
    method: ZoroHttpMethod,
    endpoint: string,
    data?: D,
  ): Promise<T> {
    return new Promise((resolve) => {});
  }
}

export const version = "1.0.0";
