# NEWS API Documentation

## Endpoints :

List of available endpoints:

- `POST /users/register`
- `POST /users/login`
- `GET /news`
- `POST /news/midtrans`
- `PATCH /news/status`
- `GET /weather`
- `GET /weather/geolocations`
- `POST /news/mail`

&nbsp;

## 1. POST /users/register

Description:

- Register user

Request:

- body:

```json
{
  "username": "string",
  "email": "string (required)",
  "password": "string (required)"
}
```

_Response (201 - CREATED)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Requests)_

```json
{
  "message": "Email is required!"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email address already in use!"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /users/login

Description

- Login user

request :

- body :

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
  "status": "string"
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

## 3. GET /news

Description:

- Get top headline news

Request:

- headers :

```json
{
  "access_token": "string"
}
```

- query :

```json
{
  "country": "string",
  "category": "string`"
}
```

_Response (200 - OK)_

```json
{
    "status": "ok",
    "totalResults": 37,
    "articles": [
        {
            "source": {
                "id": null,
                "name": "Cnbcindonesia.com"
            },
            "author": "Novina Putri Bestari",
            "title": "NASA Tabrak Pesawat ke Asteroid, Berhasil Selamatkan Bumi? - CNBC Indonesia",
            "description": "Badan Luar Angkasa Amerika Serikat (NASA) pastikan misi tabrak asteroid atau dikenal sebagai Double Asteroid Redirection Test (DART) berhasil dilakukan.",
            "url": "https://www.cnbcindonesia.com/tech/20221012140100-37-379165/nasa-tabrak-pesawat-ke-asteroid-berhasil-selamatkan-bumi",
            "urlToImage": "https://awsimages.detik.net.id/visual/2022/09/27/dimorphos_169.png?w=650",
            "publishedAt": "2022-10-12T12:14:00Z",
            "content": "Jakarta, CNBC Indonesia - Badan Luar Angkasa Amerika Serikat (NASA) pastikan misi tabrak asteroid atau dikenal sebagai Double Asteroid Redirection Test (DART) berhasil dilakukan. Orbit dari target mi… [+2238 chars]"
        },
        ....
    ]
}
```

&nbsp;

## 4. POST /news/midtrans

Description:

- Get users transaction token

Request:

- headers :

```json
{
  "access_token": "string"
}
```

- query :

```json
{
  "orderId": "string"
}
```

_Response (200 - OK)_

```json
{
  "transactionToken": "string"
}
```

&nbsp;

## 5 PATCH /news/status

Description:

- Change users status to subscribe

Request:

- headers :

```json
{
  "access_token": "string"
}
```

_Response (200 - UPDATED)_

```json
{
  "message": "Success become our subscriber"
}
```

&nbsp;

## 6 GET /weather

Description:

- Get weather information

Request:

- headers :

```json
{
  "access_token": "string"
}
```

- query :

```json
{
  "city": "string"
}
```

_Response (200 - OK)_

```json
{
  "city": {
    "Version": 1,
    "Key": "211298",
    "Type": "City",
    "Rank": 21,
    "LocalizedName": "Medan",
    "EnglishName": "Medan",
    "PrimaryPostalCode": "",
    "Region": {
      "ID": "ASI",
      "LocalizedName": "Asia",
      "EnglishName": "Asia"
    },
    "Country": {
      "ID": "ID",
      "LocalizedName": "Indonesia",
      "EnglishName": "Indonesia"
    },
    "AdministrativeArea": {
      "ID": "SU",
      "LocalizedName": "North Sumatra",
      "EnglishName": "North Sumatra",
      "Level": 1,
      "LocalizedType": "Province",
      "EnglishType": "Province",
      "CountryID": "ID"
    },
    "TimeZone": {
      "Code": "WIT",
      "Name": "Asia/Jakarta",
      "GmtOffset": 7,
      "IsDaylightSaving": false,
      "NextOffsetChange": null
    },
    "GeoPosition": {
      "Latitude": 3.592,
      "Longitude": 98.68,
      "Elevation": {
        "Metric": {
          "Value": 42,
          "Unit": "m",
          "UnitType": 5
        },
        "Imperial": {
          "Value": 139,
          "Unit": "ft",
          "UnitType": 0
        }
      }
    },
    "IsAlias": false,
    "SupplementalAdminAreas": [],
    "DataSets": [
      "AirQualityCurrentConditions",
      "AirQualityForecasts",
      "Alerts",
      "FutureRadar",
      "MinuteCast"
    ]
  },
  "cityCondition": [
    {
      "LocalObservationDateTime": "2022-10-12T21:25:00+07:00",
      "EpochTime": 1665584700,
      "WeatherText": "Partly cloudy",
      "WeatherIcon": 35,
      "HasPrecipitation": false,
      "PrecipitationType": null,
      "IsDayTime": false,
      "Temperature": {
        "Metric": {
          "Value": 26.1,
          "Unit": "C",
          "UnitType": 17
        },
        "Imperial": {
          "Value": 79,
          "Unit": "F",
          "UnitType": 18
        }
      },
      "MobileLink": "http://www.accuweather.com/en/id/medan/211298/current-weather/211298?lang=en-us",
      "Link": "http://www.accuweather.com/en/id/medan/211298/current-weather/211298?lang=en-us"
    }
  ]
}
```

&nbsp;

## 7 GET /weather/geolocations

Description:

- Get users current location

Request:

- headers :

```json
{
  "access_token": "string"
}
```

- query :

```json
{
  "location": "string"
}
```

_Response (200 - OK)_

```json
{
  "Version": 1,
  "Key": "3439006",
  "Type": "City",
  "Rank": 85,
  "LocalizedName": "Gang Buntu",
  "EnglishName": "Gang Buntu",
  "PrimaryPostalCode": "",
  "Region": {
    "ID": "ASI",
    "LocalizedName": "Asia",
    "EnglishName": "Asia"
  },
  "Country": {
    "ID": "ID",
    "LocalizedName": "Indonesia",
    "EnglishName": "Indonesia"
  },
  "AdministrativeArea": {
    "ID": "SU",
    "LocalizedName": "North Sumatra",
    "EnglishName": "North Sumatra",
    "Level": 1,
    "LocalizedType": "Province",
    "EnglishType": "Province",
    "CountryID": "ID"
  },
  "TimeZone": {
    "Code": "WIT",
    "Name": "Asia/Jakarta",
    "GmtOffset": 7,
    "IsDaylightSaving": false,
    "NextOffsetChange": null
  },
  "GeoPosition": {
    "Latitude": 3.59,
    "Longitude": 98.682,
    "Elevation": {
      "Metric": {
        "Value": 42,
        "Unit": "m",
        "UnitType": 5
      },
      "Imperial": {
        "Value": 137,
        "Unit": "ft",
        "UnitType": 0
      }
    }
  },
  "IsAlias": false,
  "ParentCity": {
    "Key": "3430629",
    "LocalizedName": "Medan Timur",
    "EnglishName": "Medan Timur"
  },
  "SupplementalAdminAreas": [
    {
      "Level": 2,
      "LocalizedName": "Medan",
      "EnglishName": "Medan"
    },
    {
      "Level": 3,
      "LocalizedName": "Medan Timur",
      "EnglishName": "Medan Timur"
    }
  ],
  "DataSets": [
    "AirQualityCurrentConditions",
    "AirQualityForecasts",
    "Alerts",
    "FutureRadar",
    "MinuteCast"
  ]
}
```

&nbsp;

## 8 POST /news/mail

Description:

- Send email to users

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
  "message": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
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
