# Game API Documentation

## Endpoints :

List of available endpoints:

<li>'POST /register'
<li>'POST /login'

<li> 'GET /buygame/:price'
<li> 'GET /games'
<li>'POST /wishlist'

<li> 'GET /wishlist'
<li> 'GET /wishlist/:id'
<li> 'DELETE /wishlist/:id'

&nbsp;

## 1. POST /register

Request:

-.body:

```json
{
  "username": "string",
  "email": "text",
  "password": "string",
  "steamUrl": "string"
}
```

\_Respone (201-Created)

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Username is require!"
}
OR
{
  "message": "Email must be unique!"
}
OR
{
  "message": "Email is require!"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Password is required!"
}
OR
{
  "message": "Steam Url is required!"
}
```

&nbsp;

## 2. POST /login

Request:

-.body:

```json
{
  "email": "text",
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

## 3. GET /games

Description:

- Get game from API

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
        "gameID": "612",
        "steamAppID": "21000",
        "cheapest": "5.00",
        "cheapestDealID": "p1VNpBFjGclfU3f5Thxjxs6uwEiSv4f854YnaHLVUAY%3D",
        "external": "LEGO Batman",
        "internalName": "LEGOBATMAN",
        "thumb": "https://originassets.akamaized.net/origin-com-store-final-assets-prod/195763/142.0x200.0/1040463_MB_142x200_en_US_^_2017-09-08-15-21-36_d7034d41216b6dc201fb20e0cee37c1e66190a11.jpg"
  },
  {
     "gameID": "167910",
        "steamAppID": "502820",
        "cheapest": "5.00",
        "cheapestDealID": "YjNMiWrcFVM1TcL5HU%2BBG5r8PQ7j8Ujc73X8BH9A4A4%3D",
        "external": "Batman: Arkham VR",
        "internalName": "BATMANARKHAMVR",
        "thumb": "https://cdn.cloudflare.steamstatic.com/steam/apps/502820/capsule_sm_120.jpg?t=1617134787"
  },
  ...
]
```

&nbsp;

## 4. GET /wishlist

Description:

- Get my wishlist from database

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
       "id": 19,
        "UserId": 1,
        "dataGame": {
            "gameID": "89095",
            "steamAppID": "200260",
            "cheapest": "4.29",
            "cheapestDealID": "8v2Vi0mT15jLphPngNy%2BoVlcDorZ5qqQyAAiohnnat0%3D",
            "external": "Batman Arkham City Game of the Year Edition",
            "internalName": "BATMANARKHAMCITYGAMEOFTHEYEAREDITION",
            "thumb": "https://cdn.cloudflare.steamstatic.com/steam/apps/200260/capsule_sm_120.jpg?t=1634156789"
        },
  },
  {
        "id": 20,
        "UserId": 1,
        "dataGame": {
            "gameID": "188716",
            "steamAppID": "883710",
            "cheapest": "10.79",
            "cheapestDealID": "A%2BRO2aiNfWVhEo%2BmPlvO6qNJn1nVguYgTslT6JAPmc8%3D",
            "external": "RESIDENT EVIL 2 / BIOHAZARD RE:2",
            "internalName": "RESIDENTEVIL2BIOHAZARDRE2",
            "thumb": "https://gamersgatep.imgix.net/b/2/f/b23b4c92043dae96672ae43036ea15d5bea54f2b.jpg?auto=&w="
        },
  },
  ...
]
```

&nbsp;

## 5. POST /wishlist

Description:
-.add game to my wishlist

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "sukses add wishlist"
}
```

&nbsp;

## 6. GET /wishlist/:id

Description:
-.GET one wishlist from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - Ok)_

```json
{
  "id": 20,
  "UserId": 1,
  "dataGame": {
    "gameID": "188716",
    "steamAppID": "883710",
    "cheapest": "10.79",
    "cheapestDealID": "A%2BRO2aiNfWVhEo%2BmPlvO6qNJn1nVguYgTslT6JAPmc8%3D",
    "external": "RESIDENT EVIL 2 / BIOHAZARD RE:2",
    "internalName": "RESIDENTEVIL2BIOHAZARDRE2",
    "thumb": "https://gamersgatep.imgix.net/b/2/f/b23b4c92043dae96672ae43036ea15d5bea54f2b.jpg?auto=&w="
  }
}
```

&nbsp;

## 7. DELETE /wishlist/:id

Description:
-.delete my wishlist

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

````json
{
  "id": "integer"
}

_Response (200 - ok)_

```json
{
  "message": "success remove wishlist",

}
````

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 8. GET /buygame/:price

Description:
-get transaction token from api midtrans

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "price": "integer"
}
```

_Response (200 - OK)_

```json
{
  " transactionToken": "integer"
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
