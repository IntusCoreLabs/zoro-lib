import { ZoroError } from "../src/core/zoroErrors.ts";
import { zoro } from "../src/zoro.ts";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Record<string, string>;
  phone: string;
  website: string;
  company: Record<string, string>;
};

const api = zoro({
  config: "https://jsonplaceholder.typicode.com",
});

/**
 * @param ZoroServices - This is an example function of how to use Zoro to make a request to an API and retrieve data from users or a single user.
 */

const ZoroServices = {
  getOne: () => api.get<User>("/users/1"),
  getAll: () => api.get<User[]>("/users"),
};

/**
 * @function Example - This function implements the ZoroService, which handles whether you want all or just one user in your request, and by implementing zoroError, it shows you the errors if your request fails for any reason.
 *
 */
async function Example() {
  try {
    const usuario = await ZoroServices.getOne();
    console.log(usuario);
  } catch (error) {
    if (error instanceof ZoroError) {
      console.error(error.response.message);
      console.error(error.response.data);
      console.error(error.response.status);
    }
  }
}

Example();

console.log(api.version);
