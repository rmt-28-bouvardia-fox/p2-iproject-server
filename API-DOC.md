# Dream Football API Documentation

## Endpoints :

List of available endpoints:

- `POST /users/register`
- `POST /users/login`
- `POST /teams`
- `GET /teams`
- `GET /players`
- `POST /players/randomBuy`
- `POST /players/allPlayers`
- `POST /players/myPlayers`
- `GET /opponetns`
- `GET /opponetns/:id`

## 1. POST /users/login

Description:
- Login user account with email and password as admin

Request:
```json
{
  "email": "string",
  "password": "string"
}
```
_Response (200 - Ok)_

```json
{
  "access_token": "string"
}
```
_Response (400 - Bad Request)_
```json
{
  "message": "Email is required !"
}
OR
{
  "message": "Password is required !"
}
```
_Response (402 - Unauthorized)_
```json
{
  "message": "Invalid email/password !"
}
```
&nbsp;
## 2. POST /users/register

Description:
- Register to system
Request:

- body:
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```
_Response (201 - Created)_

```json
{
  "id": "1",
  "email": "fadilahagiel@gmail.com",
}
```
_Response (400 - Bad Request)_

```json
{
  "message": "Email is already exists"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Email is not an email format"
}
OR
{
  "message": "password is required"
}
OR
{
  "message": "Minimal password length is 5 character!"
}
```

&nbsp;
## 3. POST /teams

Description:
- create team to system
Request:
- body:
```json
{
  "name": "string",
  "logo": "string",
}
```
_Response (201 - Created)_

```json
{
  "id": "1",
  "name": "string",
  "logo": "string",
}
```

&nbsp;
## 4. GET /teams
Description:
- Get team user from database

Request:
- headers:
```json
{
  "acces_token": "string"
}
```

_Response (200 - OK)_

```json
  {
    "id": 1,
    "name": "string",
    "logo": "string",
    "wins": "string",
    "plays": "string",
    "money":"integer",
    "UserId": "integer"
  },

```
&nbsp;

## 5. GET /players
Description:
- Get all players with pagination from database

Request:
- headers:
```json
{
  "acces_token": "string"
}
```

_Response (200 - OK)_

```json
  [
    {
    "id": 1,
    "name": "string",
    "price": "string",
    "number": "integer",
    "rating": "integer",
    "position":"string",
    "photo": "string"
    },
    {
        "id": 2,
        "name": "string",
        "price": "string",
        "number": "integer",
        "rating": "integer",
        "position":"string",
        "photo": "string"
    },
    ...
  ]

```


&nbsp;

## 6. POST /players/randomBuy
Description:
- Get one random player player from Mongo Atlas & create to database

Request:
- headers:
```json
{
  "acces_token": "string"
}
```

_Response (201 - Created)_

```json
    {
    "id": 1,
    "name": "string",
    "price": "string",
    "number": "integer",
    "rating": "integer",
    "position":"string",
    "photo": "string"
    },

```
&nbsp;

## 7. POST /players/:id
Description:
- Get one player player from Mongo Atlas & create to database

Request:
- headers:
```json
{
  "acces_token": "string"
}
```

_Response (201 - Created)_

```json
    {
    "id": 1,
    "name": "string",
    "price": "string",
    "number": "integer",
    "rating": "integer",
    "position":"string",
    "photo": "string"
    },

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
  "message": "not authorize"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```