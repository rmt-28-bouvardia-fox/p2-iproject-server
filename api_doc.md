# Bukan 9 GAG API Documentation

## Endpoints :

- `POST /register`
- `POST /login`
- `GET /authentication`
- `POST /githubSignin`
- `POST /twitterSignIn`
- `GET /posts`
- `POST /posts`
- `GET /posts/memes`
- `POST /posts/:id/like`
- `GET /posts/:id`
- `POST /posts/memeMulter`

&nbsp;

## 1. POST /register

Description:

- Register user account

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
  "id": "user.id",
  "email": "user.email"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is Required"
}
OR
{
  "message": "Username is Required"
}
OR
{
  "message": "Format Email is Incorrect"
}
OR
{
  "message": "Password minimal 5 character"
}
```

&nbsp;

## 2. POST /login

Description:

- Login user account with email and password

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
  "message": "Password is Required"
}
```

&nbsp;

## 3. POST /authentication

Description:

- Authenticate user access_token

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "username": "string",
  "id": "integer"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

## 4. POST /githubSignIn

Description:

- Login user account with github account

Request:

- headers:

```json
{
  "githubToken": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

## 5. POST /twitterSignIn

Description:

- Login user account with twitter account

Request:

- headers:

```json
{
  "twitterToken": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

&nbsp;

## 6. GET /posts

Description:

- Get all posts from database

_Response (200 - OK)_

```json
{
  "totalItems": 46,
  "posts": [
    {
      "id": 47,
      "title": "you",
      "imageUrl": "https://i.imgflip.com/6wn6qx.jpg",
      "UserId": 3,
      "createdAt": "2022-10-12T15:30:27.405Z",
      "updatedAt": "2022-10-12T15:30:27.405Z",
      "User": {
        "id": 3,
        "username": "user3",
        "email": "user3@mail.com",
        "password": "$2a$10$uRWuWJeF2wvyiG39iUnoe.JWwfkkvUSGln9ykbTQhD.XnoT7C/kiC",
        "createdAt": "2022-10-11T12:33:22.790Z",
        "updatedAt": "2022-10-11T12:33:22.790Z"
      },
      "Likes": [
        {
          "id": 60,
          "UserId": 3,
          "PostId": 47,
          "createdAt": "2022-10-12T15:40:04.030Z",
          "updatedAt": "2022-10-12T15:40:04.030Z"
        },
        {
          "id": 66,
          "UserId": 23,
          "PostId": 47,
          "createdAt": "2022-10-12T15:41:24.416Z",
          "updatedAt": "2022-10-12T15:41:24.416Z"
        },
        {
          "id": 75,
          "UserId": 27,
          "PostId": 47,
          "createdAt": "2022-10-12T19:57:22.357Z",
          "updatedAt": "2022-10-12T19:57:22.357Z"
        }
      ]
    },
    {
      "id": 46,
      "title": "weqwe",
      "imageUrl": "https://i.imgflip.com/6wn3nk.jpg",
      "UserId": 3,
      "createdAt": "2022-10-12T15:12:03.730Z",
      "updatedAt": "2022-10-12T15:12:03.730Z",
      "User": {
        "id": 3,
        "username": "user3",
        "email": "user3@mail.com",
        "password": "$2a$10$uRWuWJeF2wvyiG39iUnoe.JWwfkkvUSGln9ykbTQhD.XnoT7C/kiC",
        "createdAt": "2022-10-11T12:33:22.790Z",
        "updatedAt": "2022-10-11T12:33:22.790Z"
      },
      "Likes": [
        {
          "id": 74,
          "UserId": 23,
          "PostId": 46,
          "createdAt": "2022-10-12T15:42:16.100Z",
          "updatedAt": "2022-10-12T15:42:16.100Z"
        },
        {
          "id": 76,
          "UserId": 27,
          "PostId": 46,
          "createdAt": "2022-10-12T19:57:35.382Z",
          "updatedAt": "2022-10-12T19:57:35.382Z"
        }
      ]
    }
  ],
  "totalPages": "number",
  "currentPage": "number"
}
```

&nbsp;

## 7. POST /posts

Description:

- Create posts to database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "title": "string",
  "template_id": "number",
  "boxes": "array"
}
```

- user:

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "title": "string",
  "imageUrl": "string",
  "UserId": "integer",
  "updatedAt": "date",
  "createdAt": "date"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Title is required"
}
OR
{
  "message": "Image is Required"
}
OR
{
  "message": "Image url format is required"
}
OR
{
  "name": "imgflip_error",
  "message": "message: meme.data.error_message"
}


```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Not Authorize"
}
```

&nbsp;

## 8. GET /posts/memes

Description:

- get all template memes from imgflip

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- user:

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (200 - Ok)_

```json
{
  "totalItems": 100,
  "memes": [
    {
      "id": "181913649",
      "name": "Drake Hotline Bling",
      "url": "https://i.imgflip.com/30b1gx.jpg",
      "width": 1200,
      "height": 1200,
      "box_count": 2
    },
    {
      "id": "87743020",
      "name": "Two Buttons",
      "url": "https://i.imgflip.com/1g8my4.jpg",
      "width": 600,
      "height": 908,
      "box_count": 3
    },
    ...
  ],
  "totalPages": 10,
  "currentPage": "1"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Not Authorize"
}
```

&nbsp;

## 9. POST /posts/:id/like

Description:

- create users likes data

Request:

- params:

```json
{
  "id": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": 77,
  "UserId": 5,
  "PostId": 1,
  "updatedAt": "2022-10-12T20:24:50.580Z",
  "createdAt": "2022-10-12T20:24:50.580Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "You already liked this post"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Post Not Found"
}
```

&nbsp;

## 10. GET /post

Description:

- Get one posts from database

_Response (200 - OK)_

```json
{
  "id": 1,
  "title": "Holy carp!",
  "imageUrl": "https://i.imgflip.com/6wbgio.jpg",
  "UserId": 1,
  "createdAt": "2022-10-11T12:32:22.682Z",
  "updatedAt": "2022-10-11T12:32:22.682Z",
  "User": {
    "id": 1,
    "username": "asd",
    "email": "asd123@mail.com",
    "password": "$2a$10$0ayPMd2P30gUndrsBuQGAu13bInW.J5iChjMz4/1wiHNT0YzJNvVK",
    "createdAt": "2022-10-11T12:32:22.610Z",
    "updatedAt": "2022-10-11T12:32:22.610Z"
  },
  "Likes": [
    {
      "id": 3,
      "UserId": 3,
      "PostId": 1,
      "createdAt": "2022-10-11T12:35:48.930Z",
      "updatedAt": "2022-10-11T12:35:48.930Z"
    },
    {
      "id": 77,
      "UserId": 5,
      "PostId": 1,
      "createdAt": "2022-10-12T20:24:50.580Z",
      "updatedAt": "2022-10-12T20:24:50.580Z"
    }
  ]
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Not Authorize"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Post Not Found"
}
```

&nbsp;

## 11. POST /posts/memeMulter

Description:

- Create posts to database using multer + imagekit 

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "file": "image",
}
```

- user:

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "title": "string",
  "imageUrl": "string",
  "UserId": "integer",
  "updatedAt": "date",
  "createdAt": "date"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Title is required"
}
OR
{
  "message": "Image is Required"
}
OR
{
  "message": "Image url format is required"
}
OR
{
  "name": "imgflip_error",
  "message": "message: meme.data.error_message"
}


```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Not Authorize"
}
```

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Not Authorize"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

