## Endpoints :

List of available endpoints:

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/google`
- `GET /music`

&nbsp;

## 1. POST /auth/register

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
  "message": "Created"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "username is required"
}
OR
{
  "message": "email is required"
}
OR
{
  "message": "use email format!"
}
OR
{
  "message": "email is already use"
}
OR
{
  "message":"use real email"
}
OR
{
  "message":"password is required"
}
OR
{
  "message":"password minimum character is 5"
}
```

&nbsp;

## 2. POST /auth/login

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
  "id": "integer",
  "username": "string",
  "status": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. POST /auth/google

Request:

- headers:

```json
{
  "google_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "id": "integer",
  "username": "string",
  "status": "string"
}
```

&nbsp;

## 4. GET /music

Description:

- get music for customers

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "Love In The Way",
        "artist": "Bleu",
        "cover": "https://i.scdn.co/image/ab67616d0000b2737da6f8edfd0404b5c52de3eb",
        "source": "https://listen.hs.llnwd.net/g3/prvw/9/8/6/9/0/2658909689.mp3",
        "favorited": false
    },
    {
        "id": 3,
        "name": "Scared Money",
        "artist": "YG",
        "cover": "https://i.scdn.co/image/ab67616d0000b2737da6f8edfd0404b5c52de3eb",
        "source": "https://listen.hs.llnwd.net/g3/prvw/3/1/2/3/2/2670623213.mp3",
        "favorited": false
    },
    {
        "id": 5,
        "name": "Alone",
        "artist": "YG",
        "cover": "https://i.scdn.co/image/ab67616d0000b2737da6f8edfd0404b5c52de3eb",
        "source": "https://listen.hs.llnwd.net/g3/prvw/0/9/0/3/2/2670623090.mp3",
        "favorited": false
    },...
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
