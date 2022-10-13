# AUCTION API Documentation

## Endpoints :

List of available endpoints:

- `POST /users/register`
- `POST /users/login`

Routes below need authentication:

- `GET /products`
- `GET /products/:id`
- `PATCH /startBid/:id`
- `POST /myBidList/:productId`
- `GET /myBidList`

Routes below need authentication & authorization:

- `DELETE /deleteList/:listId`

&nbsp;

## 1. POST /users/register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "username": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /products

Description:

- Get all products from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Abaddon",
    "Description": "hydroponic",
    "price": "45000",
    "status": "open",
    "imgUrl": "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2020/11/17/8e8ea6aa-d7ac-4eca-8697-7fe05c40704c.jpg",
    "OwnerId": 1,
    "BidderId": 5
  },
  ...
]
```

&nbsp;

## 4. GET /products/:id

Description:

- Get one products from database

Request:

- params:

```json
{
  "id": "integer"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Curly Kale",
    "Description": "hydroponic",
    "price": "45000",
    "status": "open",
    "imgUrl": "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2020/11/17/8e8ea6aa-d7ac-4eca-8697-7fe05c40704c.jpg",
    "OwnerId": 1,
    "BidderId": 5,
    "OwnerProduct": {
      "id": "integer",
      "username": "string",
      "password": "string"
    },
    "BidderProduct": {
      "id": "integer",
      "username": "string",
      "password": "string"
    }
  }
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 5. PATCH /startBid/:id

Description:

- Get update products from database

Request:

- params:

```json
{
  "ProductId": "integer"
}
```

- user:

```json
{
  "UserId": "integer"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "message": "new bid by <user's username> on <product's name>"
  }
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 6. POST /myBidList/:productId

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - ok)_

```json
[
  {
    "id": 1,
    "UserId": "integer",
    "ProductId": "integer"
  }
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 7. GET /myBidList/

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "UserId": "string",
    "ProductId": "string",
    "product": {
      "id": 1,
      "name": "Curly Kale",
      "Description": "hydroponic",
      "price": "45000",
      "status": "open",
      "imgUrl": "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2020/11/17/8e8ea6aa-d7ac-4eca-8697-7fe05c40704c.jpg",
      "OwnerId": 1,
      "BidderId": 5,
      "OwnerProduct": {
        "id": "integer",
        "username": "string",
        "password": "string"
      },
      "BidderProduct": {
        "id": "integer",
        "username": "string",
        "password": "string"
      }
    }
  }
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```
&nbsp;

## 8. DELETE /deleteList/:listId

Request:


- user:

```json
{
  "UserId": "integer"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "message": "<list's id> succseed to deleted" 
  }
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```
&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
&nbsp;