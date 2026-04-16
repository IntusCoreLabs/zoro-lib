import { Zoro } from "./core/zoroHttp.js";
import type { ZoroConfig } from "./types/zoroConfigType.js";

/**
 * Creates a new Zoro HTTP client instance.
 *
 * This is the main entry point of the library. It returns a configured {@link Zoro}
 * instance ready to make HTTP requests against the provided base URL.
 * Works across all JavaScript runtimes (Node.js, Deno, Bun, and browsers).
 *
 * @param config - Configuration object. See {@link ZoroConfig} for available options.
 * @returns A fully configured {@link Zoro} instance.
 *
 * @example
 * ```ts
 * import { zoro } from "@zoro-lib/http";
 *
 * const api = zoro({ baseUrl: "https://api.example.com" });
 * const users = await api.get<User[]>("/users");
 * ```
 */
function zoro(config: ZoroConfig): Zoro {
  const instance = new Zoro(config);
  return instance;
}

export { zoro };
export type { ZoroConfig };
