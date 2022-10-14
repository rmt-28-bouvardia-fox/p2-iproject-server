# Yulje Medical API Documentation

## Endpoints

- `POST /patients/register`
- `POST /patients/login`
- `POST /patients/google-sign-in`
- `GET /patients/patientdetails`
- `POST /patients/patientdetails`
- `PUT /patients/patientdetails/:id`
- `GET /doctors`
- `POST /doctors/register`
- `POST /doctors/login`
- `GET /doctors/specialists`
- `POST /appointments`
- `GET /appointments/symptoms`
- `GET /appointments/specialists`
- `GET /appointments/diagnoses`
- `GET /appointments/patients`
- `GET /appointments/doctors`
- `GET /appointments/transactions`
- `PATCH /appointments/:appointmentId`
- `POST /appointments/consultationReports/:appointmentId`

## 1. POST /patients/register

Request:

- Body :

```json
{
  "email": "string",
  "password": "string"
}
```

Response :

- _Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

- _Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Email format is invalid"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /patients/login

Request:

- Body :

```json
{
  "email": "string",
  "password": "string"
}
```

Response :

- _Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

- _Response (401 - Unauthorized)_

```json
{
  "mesage": "Email is required"
}
OR
{
  "mesage": "Password is required"
}
OR
{
  "mesage": "Invalid email or password"
}
```

&nbsp;

## 3. POST /patients/google-sign-in

Request :

- Headers :

```json
{
  "google_token": "string"
}
```

Response :

- _Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

&nbsp;

## 4. GET /patients/patientdetails

Request :

- Headers :

```json
{
  "access_token": "string"
}
```

- User :

```json
{
  "id": "integer"
}
```

Response :

- _Response (200 - OK)_

```json
{
  "name": "string",
  "birthDate": "date",
  "address": "string",
  "gender": "string",
  "bloodType": "string",
  "diseaseHistory": "string",
  "PatientId": "integer",
  "updatedAt": "2022-09-19T09:27:25.510Z",
  "createdAt": "2022-09-19T09:27:25.510Z"
}
```

&nbsp;

## 5. POST /patients/patientdetails

Request :

- Headers :

```json
{
  "access_token": "string"
}
```

- User :

```json
{
  "id": "integer"
}
```

- Body :

```json
{
  "name": "string",
  "birthDate": "date",
  "address": "string",
  "gender": "string",
  "bloodType": "string",
  "diseaseHistory": "string"
}
```

Response :

- _Response (201 - Created)_

```json
{
  "name": "string",
  "birthDate": "date",
  "address": "string",
  "gender": "string",
  "bloodType": "string",
  "diseaseHistory": "string",
  "PatientId": "integer",
  "updatedAt": "2022-09-19T09:27:25.510Z",
  "createdAt": "2022-09-19T09:27:25.510Z"
}
```

- _Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Birth date is required"
}
OR
{
  "message": "Address is required"
}
OR
{
  "message": "Gender is required"
}
OR
{
  "message": "Blood type is required"
}
OR
{
  "message": "Patient id is required"
}
OR
{
  "message": "You already have patient details"
}
```

&nbsp;

## 6. PUT /patients/patientdetails/:id

Request :

- Headers :

```json
{
  "access_token": "string"
}
```

- User :

```json
{
  "email": "string"
}
```

- Params :

```json
{
  "id": "integer"
}
```

- Body :

```json
{
  "message": "Patient detail has been updated"
}
```

- _Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Birth date is required"
}
OR
{
  "message": "Address is required"
}
OR
{
  "message": "Gender is required"
}
OR
{
  "message": "Blood type is required"
}
OR
{
  "message": "Patient id is required"
}
OR
{
  "message": "You already have patient details"
}
```

&nbsp;

## 7. GET /doctors

Request :

- Query

```json
{
  "page": {
    "number": "integer",
    "size": "integer"
  }
}
```

Response :

- _Response (200 - OK)_

```json
"products": [
  {
    "email": "string",
    "name": "string",
    "specialist": "string",
    "SpecialistId": "integer",
    "imageUrl": "string",
  },
  ...
]
```

## 8. POST /doctors/register

Request:

- Body :

```json
{
  "email": "string",
  "password": "string",
  "name": "string",
  "specialist": "string",
  "SpecialistId": "integer"
}
```

Response :

- _Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

- _Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Email format is invalid"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Name is required"
}
OR
{
  "message": "Specialist is required"
}
OR
{
  "message": "Specialist id is required"
}
```

&nbsp;

## 9. POST /doctors/login

Request:

- Body :

```json
{
  "email": "string",
  "password": "string"
}
```

Response :

- _Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

- _Response (401 - Unauthorized)_

```json
{
  "mesage": "Email is required"
}
OR
{
  "mesage": "Password is required"
}
OR
{
  "mesage": "Invalid email or password"
}
```

## 10. GET /doctors/specialists

Request :

- Headers :

```json
{
  "access_token": "string"
}
```

- Query

```json
{
  "specialistId": "integer"
}
```

Response :

- _Response (200 - OK)_

```json
"products": [
  {
    "email": "string",
    "name": "string",
    "specialist": "string",
    "SpecialistId": "integer",
    "imageUrl": "string",
  },
  ...
]
```

&nbsp;

## 11. POST /appointments

- Request:

- Body :

```json
{
  "chiefComplaint": "string",
  "symptom": "string",
  "appointmentDate": "date",
  "status": "string",
  "DoctorId": "integer"
}
```

- User:

```json
{
  "PatientId": "integer"
}
```

Response :

- _Response (201 - Created)_

```json
{
  "id": "integer",
  "chiefComplaint": "string",
  "symptom": "string",
  "appointmentDate": "string",
  "status": "string",
  "DoctorId": "string",
  "PatientId": "string"
}
```

&nbsp;

## 12. GET /appointments/symptoms

Request :

- Headers :

```json
{
  "access_token": "string"
}
```

Response :

- _Response (200 - OK)_

```json
[
    {
        "ID": "integer",
        "Name": "string"
    },
    ...
]
```

&nbsp;

## 13. GET /appointments/specialists

Request :

- Headers :

```json
{
  "access_token": "string"
}
```

Response :

- _Response (200 - OK)_

```json
[
    {
        "ID": "integer",
        "Name": "string",
        "Accuracy": "integer"
    },
    ...
]
```

&nbsp;

## 14. GET /appointments/diagnoses

Request :

- Headers :

```json
{
  "access_token": "string"
}
```

Response :

- _Response (200 - OK)_

```json
[
  {
    "Issue":{
        "ID": "integer",
        "Name": "string",
        "ProfName": "string",
        "Icd" : "string",
        "IcdName" : "string",
        "Accuracy": "integer"
    },
    "Specialisation":[
        {
          "ID": "integer",
          "Name": "string",
          "SpecialistID": "integer"
        },
        {
          "ID": "integer",
          "Name": "string",
          "SpecialistID": "integer"
        }
    ]
  },
  ...
]
```

&nbsp;

## 15. GET /appointments/patients

-Request :
- Headers :

```json
{
  "access_token": "string"
}
```
- User :

```json
{
  "id": "integer"
}
```
Response :

- _Response (200 - OK)_

```json
[
    {
        "id": "integer",
        "chiefComplaint": "string",
        "symptom": "string",
        "appointmentDate": "date",
        "status": "string",
        "PatientId": "integer",
        "DoctorId": "integer",
        "ConsultationReport": {
            "id": "integer",
            "diagnosis": "string",
            "needSurgicalAction": "boolean",
            "needMedicalDrug": "boolean",
            "cost": "integer",
            "AppointmentId": "integer"
        },
        "Doctor": {
            "name": "string"
        }
    },
    ...
```
&nbsp;

## 16. GET /appointments/doctors
-Request :
- Headers :

```json
{
  "access_token": "string"
}
```
- User :

```json
{
  "id": "integer"
}
```
Response :

- _Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "chiefComplaint": "string",
    "symptom": "string",
    "appointmentDate": "date",
    "status": "string",
    "PatientId": "integer",
    "DoctorId": "integer",
    "Patient": {
    "id": "integer",
      "PatientDetail": {
          "name": "string"
      }
    }
  },
]
```
&nbsp;

## 17. PATCH /appointments/:appointmentId

Request :

- Headers :

```json
{
  "access_token": "string"
}
```

- Params :

```json
{
  "appointmentId": "integer (required)"
}
```

Response :

- _Response (200 - OK)_

```json
{
  "message": "Status appointment have been updated"
}
```

&nbsp;

## 18. POST /appointments/consultationReports/:appointmentId

- Request:

- Params :

```json
{
  "appointmentId": "integer (required)"
}
```

- Body :

```json
{
  "diagnosis": "string",
  "needSurgicalAction": "boolean",
  "needMedicalDrug": "boolean",
  "cost": "integer",
}
```

Response :

- _Response (201 - Created)_

```json
{
  "message": "Consultation report created, appointment status updated"
}
```

&nbsp;

## 19. GET /appointments/transactions
Request :

- Headers :

```json
{
  "access_token": "string"
}
```

- Query

```json
{
  "appointmentId": "integer",
  "cost": "integer"
}
```

Response :
- _Response (200 - OK)_

```json
{
  "transactionToken": "string"
}
```
&nbsp;



## Global Error
- _Response (401 - Not Authorized)_

```json
{
  "message": "Please login first"
}
```
- _Response (403 - Forbidden)_


```json
{
  "message": "You are not authorized"
}
```

- _Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

- _Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```