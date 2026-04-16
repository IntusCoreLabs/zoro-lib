<p align="center">
  <img src="https://github.com/watercubz/zoro/raw/main/public/zoro-http.png" alt="zoro-http logo" width="200"/>
</p>

<div aling="center">

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
![Release](https://img.shields.io/github/v/release/watercubz/zoro)
![Downloads](https://img.shields.io/npm/dw/%40zoro-lib%2Fhttp)
<a href="https://pkg-size.dev/@zoro-lib/http"><img src="https://pkg-size.dev/badge/install/15221" title="Install size for @zoro-lib/http"></a>
</div>

# zoro-lib

zoro-lib is a lightweight, zero-dependency HTTP client with full TypeScript type safety. Works across all modern JavaScript runtimes: Node.js, Deno, Bun, and browsers.

# Installing

## Package Manager

npm:

```bash
  npm install @zoro-lib/http
```

pnpm:

```bash
  pnpm add  @zoro-lib/http
```

yarn:

```bash
  yarn add @zoro-lib/http
```

## Example

```typescript
import { zoro, ZoroError } from "@zoro-lib/http";

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
  baseUrl: "https://jsonplaceholder.typicode.com",
});

const Services = {
  getOne: () => api.get<User>("/users/1"),
  getAll: () => api.get<User[]>("/users"),
};

async function Example() {
  try {
    const data = await Services.getOne();
    console.log(data);
  } catch (error) {
    if (error instanceof ZoroError) {
      console.error(error.response.message);
      console.error(error.response.data);
      console.error(error.response.status);
    }
  }
}

Example();
```

## Example with POST

```typescript
import { zoro, ZoroError } from "@zoro-lib/http";

type User = {
  id: number;
  name: string;
  email: string;
};

type CreateUserPayload = {
  name: string;
  email: string;
};

const payload: CreateUserPayload = {
  name: "John Doe",
  email: "john@doe.com",
};

const api = zoro({
  baseUrl: "https://jsonplaceholder.typicode.com",
});

async function example() {
  try {
    const user = await api.post<User, CreateUserPayload>("/users", payload);
    console.log(user);
  } catch (error) {
    if (error instanceof ZoroError) {
      console.error(error.response.status);
      console.error(error.response.message);
      console.error(error.response.data);
    }
  }
}

example();
```

## API Reference

### Initialization

```ts
import { zoro } from "@zoro-lib/http";

const api = zoro({
  baseUrl: "https://jsonplaceholder.typicode.com",
  timeout: 10_000,
  headers: {
    Authorization: "Bearer my-token",
  },
});
```

### Configuration Parameters

| Name    | Type                     | Required | Default | Description                                      |
| ------- | ------------------------ | -------- | ------- | ------------------------------------------------ |
| baseUrl | string                   | Yes      | -       | API Base URL prepended to every request endpoint |
| timeout | number                   | No       | 30000   | Request timeout in milliseconds                  |
| headers | Record\<string, string\> | No       | {}      | Default headers sent with every request          |

---

## Methods

All methods are **type-safe** and support **TypeScript generics** to define the expected response type.

---

### GET

Performs an HTTP **GET** request.

```ts
api.get<T>(endpoint);
```

#### Parameters

| Name     | Type   | Description            |
| -------- | ------ | ---------------------- |
| endpoint | string | Relative resource path |

#### Type Parameters

| Name | Description            |
| ---- | ---------------------- |
| `T`  | Expected response type |

#### Example

```ts
type User = {
  id: number;
  name: string;
  email: string;
};

const users = await api.get<User[]>("/users");
```

---

### POST

Performs an HTTP **POST** request.

```ts
api.post<T, D>(endpoint, data);
```

#### Parameters

| Name     | Type   | Description            |
| -------- | ------ | ---------------------- |
| endpoint | string | Relative resource path |
| data     | D      | Request body (JSON)    |

#### Type Parameters

| Name | Description            |
| ---- | ---------------------- |
| `T`  | Expected response type |
| `D`  | Request body type      |

#### Example

```ts
type User = {
  id: number;
  name: string;
  email: string;
};

const newUser = await api.post<User, { name: string; email: string }>("/users", {
  name: "John",
  email: "john@mail.com",
});
```

---

### PUT

Performs an HTTP **PUT** request for full replacements.

```ts
api.put<T, D>(endpoint, data);
```

#### Parameters

| Name     | Type   | Description            |
| -------- | ------ | ---------------------- |
| endpoint | string | Relative resource path |
| data     | D      | Request body (JSON)    |

#### Type Parameters

| Name | Description            |
| ---- | ---------------------- |
| `T`  | Expected response type |
| `D`  | Request body type      |

#### Example

```ts
const updatedUser = await api.put<User, { name: string }>("/users/1", {
  name: "John Updated",
});
```

---

### PATCH

Performs an HTTP **PATCH** request for partial updates.

```ts
api.patch<T, D>(endpoint, data);
```

#### Parameters

| Name     | Type   | Description                |
| -------- | ------ | -------------------------- |
| endpoint | string | Relative resource path     |
| data     | D      | Partial update body (JSON) |

#### Type Parameters

| Name | Description            |
| ---- | ---------------------- |
| `T`  | Expected response type |
| `D`  | Request body type      |

#### Example

```ts
const patched = await api.patch<User, { email: string }>("/users/1", {
  email: "new@mail.com",
});
```

---

### DELETE

Performs an HTTP **DELETE** request.

```ts
api.delete<T>(endpoint);
```

#### Parameters

| Name     | Type   | Description            |
| -------- | ------ | ---------------------- |
| endpoint | string | Relative resource path |

#### Type Parameters

| Name | Description            |
| ---- | ---------------------- |
| `T`  | Expected response type |

#### Example

```ts
await api.delete("/users/1");
```

---

## Full Example

```ts
import { zoro } from "@zoro-lib/http";

type User = {
  id: number;
  name: string;
  email: string;
};

const api = zoro({
  baseUrl: "https://jsonplaceholder.typicode.com",
  timeout: 10_000,
  headers: {
    Authorization: "Bearer my-token",
  },
});

const users = await api.get<User[]>("/users");

const newUser = await api.post<User, { name: string; email: string }>("/users", {
  name: "John",
  email: "john@mail.com",
});

const updatedUser = await api.put<User, { name: string }>("/users/1", {
  name: "John Updated",
});

const patched = await api.patch<User, { email: string }>("/users/1", {
  email: "new@mail.com",
});

await api.delete("/users/1");
```

---

## Notes

- All methods return `Promise<T>`
- Generics provide full type safety and autocomplete
- The `endpoint` is automatically appended to the base URL
- Zero production dependencies — uses the native Fetch API
- Works on Node.js (>=22.12.0), Deno, Bun, and browsers
- Requests that exceed the configured `timeout` throw a `ZoroError` with status `0`
- Endpoints must be relative paths — absolute URLs are rejected to prevent SSRF
  
## Contributors 
- [@buttercubz](https://www.github.com/buttercubz)
## Authors

- [@watercubz](https://www.github.com/watercubz)
