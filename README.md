
# gaybe-safe-haven-BE
======= 
## Project Description
   
#### Overview
The LGBTQ+ community faces unique challenges when it comes to finding safe and welcoming shelters, especially for youth. Our app aims to bridge this information gap by allowing community members to submit safe shelter information through our app, which is then added to an API that we are building. Additionally, users can leave reviews based on their experiences at these shelters to provide valuable insight for those seeking safe and inclusive shelter options.    

This repo is the backend API for the production app linked below.
   
Production App Demo:  https://gay-fe-safe-haven.vercel.app/
<br>
Front End Repo:  https://github.com/gaybe-safe-haven/gayFE-safe-haven

#### Backend API Team Members
- https://github.com/Tscasady
- https://github.com/Pocketzs
- https://github.com/Pkseverance


   

### Built With
- Typescript
- Express
- Prisma
- Postgresql
- Deployed on Heroku
- Mocha/Chai
   
   
   
## Getting Started

### Installation
   
1. Fork the Repo from the [Repository](https://github.com/gaybe-safe-haven/gaybe-safe-haven-BE)
2. Clone the repo
   ```sh
   git@github.com:gaybe-safe-haven/gaybe-safe-haven-BE.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Set up your prefered local Database
5. Add the url of database to key of `DATABASE_URL`
   ```
   /.env
   
   DATABASE_URL = <your database url>
   ```
6. Start up the server
   ```sh
   npm run dev
   ```

   
   
   
# RESTful Endpoints
A collection of endpoints exposed on this API with example requests and responses.      
Production Domain url: https://gaybe-safe-haven.herokuapp.com   

### Post a Shelter


```http
POST https://gaybe-safe-haven.herokuapp.com/api/v1/shelters
```

<details>
<summary>Example</summary>
<br>
    

| Code | Description |
| :--- | :--- |
| 201 | `Created` |

Example Request Body: 
   
This body is REQUIRED in any request to create a shelter.     
NOTE: websiteUrl key is optional and can be passed with a value of null or not included at all
   
```json
{
    "name": "Thrive Youth Center",
    "streetAddress": "1 Haven for Hope Way",
    "city": "San Antonio",
    "state": "TX",
    "zip": "78207",
    "phoneNumber": "312 234-1234",
    "websiteUrl": "thriveyouthcenter.org"
}
```   
   
Example Response:   

```json

{
    "data": {
        "id": 1,
        "type": "shelter",
        "attributes": {
            "name": "Thrive Youth Center",
            "streetAddress": "1 Haven for Hope Way",
            "city": "San Antonio",
            "state": "TX",
            "zip": "78207",
            "websiteUrl": "thriveyouthcenter.org",
            "phoneNumber": "312 234-1234",
            "verified": false,
            "avgStaff": null,
            "avgClean": null,
            "avgSafety": null
        }
    }
}
```

</details>

---   

### Get All Shelters


```http
GET https://gaybe-safe-haven.herokuapp.com/api/v1/shelters
```

<details>
<summary>Example</summary>
<br>
    

| Code | Description |
| :--- | :--- |
| 200 | `Ok` |

 
Example Response:   

```json

{
    "data": [
        {
            "id": 1,
            "type": "shelter",
            "attributes": {
                "name": "Thrive Youth Center",
                "streetAddress": "1 Haven for Hope Way",
                "city": "San Antonio",
                "state": "TX",
                "zip": "78207",
                "websiteUrl": "thriveyouthcenter.org",
                "phoneNumber": "312 234-1234",
                "verified": false,
                "avgStaff": null,
                "avgClean": null,
                "avgSafety": null
            }
        }
    ]
}
```

</details>

---
   ### Get a Shelter


```http
GET https://gaybe-safe-haven.herokuapp.com/api/v1/shelters/1
```

<details>
<summary>Example</summary>
<br>
    

| Code | Description |
| :--- | :--- |
| 200 | `Ok` |

Example Request Body: 
   
<Any helpful explantion of required body or params>   
NOTE: <optional params or keys noted>
   
Example Response:   

```json

{    
   "data": {
        "id": 1,
        "type": "shelter",
        "attributes": {
            "name": "Thrive Youth Center",
            "streetAddress": "1 Haven for Hope Way",
            "city": "San Antonio",
            "state": "TX",
            "zip": "78207",
            "websiteUrl": "thriveyouthcenter.org",
            "phoneNumber": "312 234-1234",
            "verified": false,
            "avgStaff": null,
            "avgClean": null,
            "avgSafety": null
        }
    } 
}
```

</details>

---

### Post a Shelter Review

```http
POST https://gaybe-safe-haven.herokuapp.com/api/v1/reviews
```

<details>
<summary>Example</summary>
<br>
    

| Code | Description |
| :--- | :--- |
| 201 | `Created` |

Example Request Body: 
   
<Any helpful explantion of required body or params>   
NOTE: <optional params or keys noted>
   
```json
{
    "shelterId": 1,
    "cleanliness": 6.7,
    "staff": 5.3,
    "safety": 7.8
}
```   
   
Example Response:   

```json

{
    "data": {
        "id": 3,
        "type": "review",
        "attributes": {
            "shelterId": 1,
            "cleanliness": 6.7,
            "staff": 5.3,
            "safety": 7.8
        }
    }   
}
```

</details>

---
    
<br>
<br>
