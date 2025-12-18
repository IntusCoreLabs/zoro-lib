<p align="center">
  <img src="https://github.com/watercubz/zoro/raw/main/public/zoro-http.png" alt="zoro-http logo" width="200"/>
</p>

<div aling="center">

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![Release](https://img.shields.io/github/v/release/watercubz/zoro)
![License]()
![Downloads](https://img.shields.io/npm/dw/%40zoro)


</div>


# zoro

zoro is an HTTP client, in which you can make requests, GET, POST, PUT, DELETE, etc. zoro is specialized in being lightweight, portable, and for simple projects, without dependencies and without tedious configurations.

## Installation

Install zoro with npm

```bash
  npm install @zoro
```
    
## Example

```javascript
import zoro, { zoroCathError} from '@zoro'


const zoro = new zoro()


zoro.get('api/users', (err, data ) => {
     if(err) {
       zoroCathError(err)
     } else {
         console.log(data)
     }
})

/*
  {
   users: 'jhon',
   firstName: 'Jhon',
   lastName: 'Doe',
   age: 35

  }

*/


```


```javascript

 const payload = {
     user: 'Annie',
     lastName: 'Doe',
     age: 21
 }

 zoro.post('api/users', payload, (err, data) => {
      if(err) {
          zoroCathError(err)
      } else {
          console.log('zoro handled the request satisfactorily.', data)
      }
})
```



```javascript
 function getAllUsers() {
     return zoro.get('api/zoro')
 }


```
## Authors

- [@watercubz](https://www.github.com/watercubz)
