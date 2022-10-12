# Challenge1 API Documentation

## Endpoints :

List of available endpoints:

- `POST /clients/register`
- `POST /clients/login`
- `GET /characters`
- `GET /comics`
- `GET /comics/:comicId`
- `PATCH /orders`
- `GET /orders/profile`
- `GET /orders/cart`
- `POST /orders/add-to-cart`
- `GET /orders/payment`



&nbsp;


## 1. POST /clients/register

Request :

-body :
```json
{
    "username":"string",
    "email": "string",
    "password": "string",
    "phoneNumber": "string",
    "address" : "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email can't be empty"
}
OR
{
  "message": "Email has already registered"
}
OR
{
  "message": "Email Format is wrong"
}
OR
{
  "message": "Username can't be empty"
}
OR
{
  "message": "Username has already registered"
}
OR
{
  "message": "Password can't be empty"
}
OR
{
    "message" : "Password length must between 8 and 32 characters"
}


```
&&nbsp

## 2. POST /clients/login

Request :

-body :
```json
{
    "email": "string",
    "password": "string"
}
```

_Response (200 - OK)_

```json
{
    "access_token" : string,
    "username" : string
}
```

_Response (400 - Bad Request)_

```json
{
    "message" : "Email is required"
}
OR
{
    "message" : "Password is required"
}
OR
{
    "meesage" : "Invalid email or password"
}
```

## 3. GET /characters


_Response (200 - OK)_

```json
[
    {
        "id" : integer,
        "name" : string,
        "description" : string,
        "modified" : date,
        "thumbnail" : object,
        "resourceURI": string,
        "comics": object,
        "series": object,
        "stories": object,
        "events": object,
        "urls": array
    }, ...
]
```
&nbsp;


## 4. GET /comics

_Response (200 - OK)_

```json
[
    {
        "id": integer,
        "digitalId": integer,
        "title": string,
        "issueNumber": integer,
        "variantDescription": string,
        "description": string,
        "modified": date,
        "isbn": string,
        "upc": string,
        "diamondCode": string,
        "ean": string,
        "issn": string,
        "format": string,
        "pageCount": integer,
        "textObjects": array,
        "resourceURI": string,
        "urls": array,
        "series": object,
        "variants": array,
        "collections": array,
        "collectedIssues": array,
        "dates": array,
        "prices": array,
        "thumbnail": object,
        "images": array,
        "creators": object,
        "characters": object,
        "stories": object,
        "events": object
    },...
]
```
&nbsp;


## 5. GET /comics/:comicId

_Response (200 - OK)_

```json
{
    "id": integer,
    "digitalId": integer,
    "title": string,
    "issueNumber": integer,
    "variantDescription": string,
    "description": string,
    "modified": date,
    "isbn": string,
    "upc": string,
    "diamondCode": string,
    "ean": string,
    "issn": string,
    "format": string,
    "pageCount": integer,
    "textObjects": array,
    "resourceURI": string,
    "urls": array,
    "series": object,
    "variants": array,
    "collections": array,
    "collectedIssues": array,
    "dates": array,
    "prices": array,
    "thumbnail": object,
    "images": array,
    "creators": object,
    "characters": object,
    "stories": object,
    "events": object
}
```
&nbsp;

## 6. PATCH /orders

Request 

-headers : 

```json
{
    "access_token" : string
}
```

-body :
```json
{
    "order_id" = string
}
```

_Response(200 -OK)_

```json
{
    "message" : "success paid"
}
```

&nbsp;

##7. GET /orders/profile

-headers : 

```json
{
    "access_token" : string
}
```

_Response(200 -OK)_

```json
{
    "id": integer,
    "username": string,
    "email": string,
    "password": string,
    "firstName": "tes2",
    "lastName": string,
    "address": string,
    "phoneNumber": string,
    "createdAt": data,
    "updatedAt": data,
    "Orders": [
        {
            "id": integer,
            "orderNumber": string,
            "status": string,
            "comicId": string,
            "comicName": string,
            "comicImageUrl": string,
            "price": integer,
            "order_id": string,
            "UserId": integer,
            "createdAt": date,
            "updatedAt": date
        },...
    ]
}
```

&nbsp;

## 8. GET /orders/cart

-headers : 

```json
{
    "access_token" : string
}
```

_Response(200 -OK)_


```json
[
    {
        "id": integer,
        "orderNumber": string,
        "status": string,
        "comicId": string,
        "comicName": string,
        "comicImageUrl": string,
        "price": integer,
        "order_id": string,
        "UserId": integer,
        "createdAt": date,
        "updatedAt": date
    }
]
```

## 9. POST /add-to-cart

-headers : 

```json
{
    "access_token" : string
}
```

-body :

```json
{
    comicId : string,
    comicName : string,
    comicImageUrl : string,
    price : integer
}
```

_Response(200 -OK)_

```json
{
    "added" : object
}
```

## 10. GET /payment

-headers : 

```json
{
    "access_token" : string
}
```

-query :

```json
{
    "gross_amount" : integer
}
```

_Response(201 -OK)_

```json
{
    "transactionToken" : string
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



_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```