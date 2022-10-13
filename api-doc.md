# YGOXChange API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /login-google`
- `GET /user`

- `POST /card/details`
- `GET /card/search`

- `GET /bid/:id`

- `POST /my-bid/`
-  `PATCH /my-bid/:id`
-  `GET /my-bid/winning`
-  `GET /my-bid/selling`
-  `POST /my-bid/payment`
-  `POST /my-bid/payment-callback`

## 1. POST /register

Description:

- Register to website

Request:

- headers :

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": 1,
  "email": "pchossy@gmail.com"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email must be unique"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Description:

- Login to website

Request:

- headers :

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

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
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjYzOTEzMzc0fQ.dj9hOIi-diNMQ_Ktm3O93JfAz6cW5ec1sgV6FEyP8C4"
  "username": "Chossy"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid Email/Password"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 3. POST /login-google

Description:

- Login using Google authentication

Request:

- headers :

```json
{
  "Content-Type": "application/x-www-form-urlencoded",
  "google_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjYzOTEzMzc0fQ.dj9hOIi-diNMQ_Ktm3O93JfAz6cW5ec1sgV6FEyP8C4"
  //dummy access token
}
```

_Response (200 - Success)_

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjYzOTEzMzc0fQ.dj9hOIi-diNMQ_Ktm3O93JfAz6cW5ec1sgV6FEyP8C4"
  "username": "Chossy"
}
```

## 4. GET /user

Description:

- Get user data from access token

Request:

- headers :

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjYzOTEzMzc0fQ.dj9hOIi-diNMQ_Ktm3O93JfAz6cW5ec1sgV6FEyP8C4"
  //dummy access token
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "username": "Chossy",
  "email": "pchossy@gmail.com",
  "phoneNumber": "082251636919"
},
```

&nbsp;


## 5. POST /card/details

Description:

- Get array of card information by string of ids, delimit by comma

Request:

- body:

```json
{
  "ids": "string",
}
```

_Response (200 - Success)_

```json
{
  "id": 13,
  "name": "chino jeans",
  "description": "chino jeans",
  "price": 175000,
  "stock": 15,
  "imgUrl": "http://dummyimage.com/191x100.png/dddddd/000000",
  "categoryId": 2,
  "authorId": 3,
  "updatedAt": "2022-09-19T12:53:08.938Z",
  "createdAt": "2022-09-19T12:53:08.938Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "String of ids not provided"
}
```


&nbsp;

## 6. GET /card/search

Description:

- Search card by query, type, race, and attribute with pagination.

Request:

_Response (200 - OK)_

```json
{
	"data": [{
		"id": 46986414,
        "name": "Dark Magician",
        "type": "Normal Monster",
        "desc": "''The ultimate wizard in terms of attack and defense.''",
        "atk": 2500,
        "def": 2100,
        "level": 7,
        "race": "Spellcaster",
        "attribute": "DARK",
        "archetype": "Dark Magician",
        "card_sets":[{
          "set_name": "2002 Collectors Tin",
          "set_code": "BPT-001",
          "set_rarity": "Secret Rare",
          "set_rarity_code": "(ScR)",
          "set_price": "139.34",
          "set_url": "https://store.tcgplayer.com/yugioh/2002-collectors-tin/dark-magician?partner=YGOPRODeck&utm_campaign=affiliate&utm_medium=card_set_url_api&utm_source=YGOPRODeck"
        },
        ...
        ],
        "card_images":[{
	        "id": 46986414,
"image_url": "https://images.ygoprodeck.com/images/cards/46986414.jpg","image_url_small": "https://images.ygoprodeck.com/images/cards_small/46986414.jpg"
        },
        ...
        ]
        "card_prices": [{
	        "cardmarket_price": "0.20",
            "tcgplayer_price": "0.51",
            "ebay_price": "10.95",
            "amazon_price": "14.45",
            "coolstuffinc_price": "19.99"
        }]
	},
	...
	]
	"meta": {
	"current_rows": 5,
        "total_rows": 10,
        "rows_remaining": 0,
        "total_pages": 2,
        "pages_remaining": 0,
        "next_page": "https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=dark+magician&offset=5&num=5",
        "next_page_offset": 5,
        "previous_page": "https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=dark+magician&offset=0&num=5",
        "previous_page_offset": 0
	}
}
```

&nbsp;

## 7. GET /bid/:id

Description:

- Get details of a bid

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
	"buyerId": 2
	"cardDetail": {id: 32600024, name: "Chamber Dragonmaid", type: "Effect Monster",…}
	"cardId": 32600024
	"condition": "New"
	"createdAt": 1665555753104
	"createdBy": "Chossy"
	"currentPrice": 220000
	"expiredBy": 1665728520000
	"note": "Rare Dragonmaid from tin boxes"
	"sellerId": 1
	"startPrice": 150000
```

_Response (400 - Bad request)_

```json
{
  "message": "Id is required"
}
```

&nbsp;

## 8. POST /my-bid

Description:

- Start and save a bid

Request:

- headers :

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjYzOTEzMzc0fQ.dj9hOIi-diNMQ_Ktm3O93JfAz6cW5ec1sgV6FEyP8C4"
  //dummy access token
}
```

- params:

```json
{
  "cardId" : "string (required)",
  "expiredBy" : "integer (required)",
  "startPrice" : "string (required)",
  "notes" : "string",
  "condition" : "string",
}
```

_Response (201 - Created)_

```json
{
  "message": "Success add a new bid",
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Card Id is required"
}
OR
{
  "message": "Auction End Datetime is required"
}
OR
{
  "message": "Price is required"
}
OR
{
  "message": "Minimum price is 1000"
}
```

&nbsp;

## 9. PATCH /my-bid/:id
Description:

- Update a bid with new price and current user

Request:

- headers :

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjYzOTEzMzc0fQ.dj9hOIi-diNMQ_Ktm3O93JfAz6cW5ec1sgV6FEyP8C4"
  //dummy access token
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "currentPrice": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message" : "Bid success!"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Id is required"
}
OR
{
  "message": "Current Price is required"
}
OR
{
  "message": "You already bid on this item"
}
OR
{
  "message": "New Bid must be higher than Current Bid"
}
```

&nbsp;

## 10. GET /my-bid/winning
Description:

- Get current user winning bid list

Request:

- headers :

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjYzOTEzMzc0fQ.dj9hOIi-diNMQ_Ktm3O93JfAz6cW5ec1sgV6FEyP8C4"
  //dummy access token
}
```

_Response (200 - OK)_

```json
	"key": "-NE6wX42ZzqlvreFUba1",
	"buyerId": 2
	"cardDetail": {id: 32600024, name: "Chamber Dragonmaid", type: "Effect Monster",…}
	"cardId": 32600024
	"condition": "New"
	"createdAt": 1665555753104
	"createdBy": "Chossy"
	"currentPrice": 220000
	"expiredBy": 1665728520000
	"note": "Rare Dragonmaid from tin boxes"
	"sellerId": 1
	"startPrice": 150000
```

&nbsp;
## 11. GET /my-bid/selling
Description:

- Get current user selling bid list

Request:

- headers :

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjYzOTEzMzc0fQ.dj9hOIi-diNMQ_Ktm3O93JfAz6cW5ec1sgV6FEyP8C4"
  //dummy access token
}
```

_Response (200 - OK)_

```json
	"key": "-NE6wX42ZzqlvreFUba1",
	"buyerId": 2
	"cardDetail": {id: 32600024, name: "Chamber Dragonmaid", type: "Effect Monster",…}
	"cardId": 32600024
	"condition": "New"
	"createdAt": 1665555753104
	"createdBy": "Chossy"
	"currentPrice": 220000
	"expiredBy": 1665728520000
	"note": "Rare Dragonmaid from tin boxes"
	"sellerId": 1
	"startPrice": 150000
```

&nbsp;

## 12. POST /my-bid/payment

Description:

- Trigger and send data to midtrans

Request:

- headers :

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjYzOTEzMzc0fQ.dj9hOIi-diNMQ_Ktm3O93JfAz6cW5ec1sgV6FEyP8C4"
  //dummy access token
}
```

- body:

```json
{
  "payload": {
	"key": "-NE6wX42ZzqlvreFUba1",
	"buyerId": 2
	"cardDetail": {id: 32600024, name: "Chamber Dragonmaid", type: "Effect Monster",…}
	"cardId": 32600024
	"condition": "New"
	"createdAt": 1665555753104
	"createdBy": "Chossy"
	"currentPrice": 220000
	"expiredBy": 1665728520000
	"note": "Rare Dragonmaid from tin boxes"
	"sellerId": 1
	"startPrice": 150000
  }
}
```

_Response (200 - OK)_

```json
{
  "token": "d379aa71-99eb-4dd1-b9bb-eefe813746e9",
  "redirect_url": "https://app.sandbox.veritrans.co.id/snap/v2/vtweb/d379aa71-99eb-4dd1-b9bb-eefe813746e9",
  "id": "-NE6wX42ZzqlvreFUba1"
}
```

&nbsp;

## 13. POST /my-bid/payment-callback

Description:

- Delete data from database if payment successful

Request:

- headers :

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjYzOTEzMzc0fQ.dj9hOIi-diNMQ_Ktm3O93JfAz6cW5ec1sgV6FEyP8C4"
  //dummy access token
}
```

- body:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success delete bid",
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Id is required"
}
```

&nbsp;

## Global Error

_Response (401 - Not Authorized/Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Not Found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```
