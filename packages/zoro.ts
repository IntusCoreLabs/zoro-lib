import { Zoro } from "./core/zoroHttp.ts";

/**

* Instantiates the main zoro class.

* * @param config - Configuration object containing the baseUrl.

* @returns An instance of the Zoro class to make requests.

*/
function zoro({ config }: { config: string }): Zoro {
  const instance = new Zoro(config);
  return instance;
}

export { zoro };
