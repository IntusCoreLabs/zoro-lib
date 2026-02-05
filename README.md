<p align="center">
  <img src="https://github.com/watercubz/zoro/raw/main/public/zoro-http.png" alt="zoro-http logo" width="200"/>
</p>

<div aling="center">

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![Release](https://img.shields.io/github/v/release/watercubz/zoro)
![Downloads](https://img.shields.io/npm/dw/%40zoro)


</div>


# zoro

Zoro is a lightweight, dependency-free HTTP client built on XMLHttpRequest with full TypeScript type safety.

# Installing


## Package Manager

npm:
```bash
  npm install @zoro
```
pnpm:
```bash
  pnpm add  @zoro
```
yarn:
```bash
  yarn add @zoro
```

## Example

```typescript
import Zoro, { ZoroError } from '@zoro'

type DataUser = {
  user: string
  firstName: string
  lastName: string
  age: number
}

const zoro = new Zoro()

zoro.get<DataUser>('api/users', (err, data) => {
  if (err) {
    if (err instanceof ZoroError<DataUser>) {
      console.error(err.response.status)
      console.error(err.response.message)
      console.error(err.response.data)
    }

    return
  }

  console.log(data.user)
})

```

## Example

```javascript
import Zoro, { ZoroError } from '@zoro'

type DataUser = {
  user: string
  firstName: string
  lastName: string
  age: number
}

type CreateUserPayload = {
  user: string
  lastName: string
  age: number
}

const payload: CreateUserPayload = {
  user: 'Annie',
  lastName: 'Doe',
  age: 21
}


zoro.post<DataUser>('api/users', payload, (err, data) => {
  if (err) {
    if (err instanceof ZoroError<DataUser>) {
      console.error(err.response.status)
      console.error(err.response.message)
      console.error(err.response.data)
    }

    return
  }

  console.log('Zoro handled the request satisfactorily.', data)
})
```

## Authors

- [@watercubz](https://www.github.com/watercubz)
