# Wedding Invtation Documentation

## Endpoints :

List of available endpoints :
- `POST /register`
- `POST /login`
- `POST /create`
- `GET /template`
- `GET /:coupleName/journey`
- `PUT /:coupleName`
- `DELETE /:coupleName`

&nbsp;

## 1. POST /register

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
  "email": "string"
}
```

_Response (400 - Errors)_

```json
{
    "message": "Email already used"
}
OR
{
    "message": "Password is required min 5 characters"
}
OR
{
    "message": "Format email is wrong"
}
```

&nbsp;

## 2. POST/LOGIN

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
  "access_token": "string",
  "findUser": {
    "id": "integer",
    "username": "string",
    "email": "string",
    "password": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

_Response (401 - Invalid authentication)_

```json
{
  "message": "Email or Password is required"
}
OR
{
    "message": "Invalid email or password"
}
```

&nbsp;

## 3. POST /create

Request:

- headers :

```json
{
  "access_token": "string"
}
```

```json
{
  "groomName": "string",
  "fatherGroom": "string",
  "motherGroom": "string",
  "BrideName": "string",
  "fatherBride": "string",
  "motherBride": "string",
  "weddingDate": "date",
  "weddingLocation": "text",
  "TemplateId": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "UserId": "integer",
  "groomName": "string",
  "fatherGroom": "string",
  "motherGroom": "string",
  "BrideName": "string",
  "fatherBride": "string",
  "motherBride": "string",
  "weddingDate": "date",
  "weddingLocation": "string",
  "TemplateId": "integer",
  "coupleName": "string",
  "maps": "text",
  "updatedAt": "date",
  "createdAt": "date"
}
```

_Response (400 - Bad Request)_

```json
{
    "message":"Groom's name is required"
}
OR
{
    "message":"The name of the groom's father is required"
}
OR
{
    "message":"The name of the groom's mother is required"
}
OR
{
    "message":"Bride's name is required"
}
OR
{
    "message":"The name of the bride's father is required"
}
OR
{
    "message":"The name of the bride's mother is required"
}
OR
{
    "message":"Wedding Date is required"
}
OR
{
    "message":"Wedding Location is required"
}
OR
{
    "message":"Template is required"
}
```

_Response (401 - Invalid authentication)_

```json
{
  "message": "Invalid authentication"
}
```

&nbsp;

## 4. GET /template

_Response (200 - OK)_

```json
[
    {
        "id": "integer",
        "background": "text",
        "createdAt": "date",
        "updatedAt": "date"
    },

    ...,
]
```

_Response (404 - Data nof found)_

```json
{
  "message": "Data nof found"
}
```

&nbsp;

## 5. GET /:coupleName/journey

_Response (200 - OK)_

```json
{
  "id": "integer",
  "UserId": "integer",
  "groomName": "string",
  "fatherGroom": "string",
  "motherGroom": "string",
  "BrideName": "string",
  "fatherBride": "string",
  "motherBride": "string",
  "weddingDate": "date",
  "weddingLocation": "string",
  "coupleName": "string",
  "TemplateId": "integer",
  "maps": "text",
  "createdAt": "date",
  "updatedAt": "date",
  "Template": {
    "id": "integer",
    "background": "text",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

_Response (404 - Data nof found)_

```json
{
  "message": "Data nof found"
}
```

&nbsp;

## 6. PUT /:coupleName

Request:

- headers :

```json
{
  "access_token": "string"
}
```

```json
{
  "groomName": "string",
  "fatherGroom": "string",
  "motherGroom": "string",
  "BrideName": "string",
  "fatherBride": "string",
  "motherBride": "string",
  "weddingDate": "date",
  "weddingLocation": "text",
  "TemplateId": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "UserId": "integer",
  "groomName": "string",
  "fatherGroom": "string",
  "motherGroom": "string",
  "BrideName": "string",
  "fatherBride": "string",
  "motherBride": "string",
  "weddingDate": "date",
  "weddingLocation": "string",
  "TemplateId": "integer",
  "coupleName": "string",
  "maps": "text",
  "updatedAt": "date",
  "createdAt": "date"
}
```

_Response (401 - Invalid authentication)_

```json
{
  "message": "Invalid authentication"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You don't have permission to access"
}
```

_Response (404 - Data nof found)_

```json
{
  "message": "Data nof found"
}
```

&nbsp;

## 7. DELETE /:coupleName

Request:

- headers :

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success"
}
```

_Response (401 - Invalid authentication)_

```json
{
  "message": "Invalid authentication"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You don't have permission to access"
}
```

_Response (404 - Data nof found)_

```json
{
  "message": "Data nof found"
}
```

&nbsp;

## 8. Global Error

_Response (500 - Error)_

```json
{
  "message": "Internal Server Error"
}
```