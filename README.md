<p align="center">
  <img src="https://github.com/watercubz/zoro/raw/main/public/zoro-http.png" alt="zoro-http logo" width="200"/>
</p>

<div aling="center">

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
![Release](https://img.shields.io/github/v/release/watercubz/zoro)
![Downloads](https://img.shields.io/npm/dw/%40zoro-lib%2Fhttp)

</div>

# zoro-lib

zoro-lib is a lightweight, HTTP client built on XMLHttpRequest with full TypeScript type safety.

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
import zoro, { ZoroError } from "@zoro-lib/http";

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

## Example

```javascript
import zoro, { ZoroError } from "@zoro-lib/http";

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
  config: "https://jsonplaceholder.typicode.com",
});

async function example() {
  try {
    const user = await api.post<User>("/users", payload);
    console.log(user);
  } catch (error) {
    if (error instanceof ZoroError<User>) {
      console.error(error.response.status);
      console.error(error.response.message);
      console.error(error.response.data);
    }
  }
}

example();

```

## API Reference

```ts
## Initialization

const api = zoro({
  config: "https://jsonplaceholder.typicode.com",
});

```

### Configuration Parameters

| Name   | Type   | Description  |
| ------ | ------ | ------------ |
| config | string | API Base URL |

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
api.post<T>(endpoint, data);
```

#### Parameters

| Name     | Type   | Description            |
| -------- | ------ | ---------------------- |
| endpoint | string | Relative resource path |
| data     | object | Request body (JSON)    |

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

const newUser = await api.post<User>("/users", {
  name: "John",
  email: "john@mail.com",
});
```

---

### PUT

Performs an HTTP **PUT** request.

```ts
api.put<T>(endpoint, data);
```

#### Parameters

| Name     | Type   | Description            |
| -------- | ------ | ---------------------- |
| endpoint | string | Relative resource path |
| data     | object | Request body (JSON)    |

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

const updatedUser = await api.put<User>("/users/1", {
  name: "John Updated",
});
```

---

## Full Example

```ts
type User = {
  id: number;
  name: string;
  email: string;
};

const api = zoro({
  config: "https://jsonplaceholder.typicode.com",
});

const users = await api.get<User[]>("/users");

const newUser = await api.post<User>("/users", {
  name: "John",
  email: "john@mail.com",
});

const updatedUser = await api.put<User>("/users/1", {
  name: "John Updated",
});
```

---

## Notes

- All methods return `Promise<T>`
- Generics provide full type safety and autocomplete
- The `endpoint` is automatically appended to the base URL

---

## Why XMLHttpRequest?

zoro is built on XMLHttpRequest to provide:

Compatibility with older environments

Fine-grained control over request lifecycle

Despite this, the public API remains modern and Promise-based.

## Authors

- [@watercubz](https://www.github.com/watercubz)
