
# gaybe-safe-haven-BE
=======
   If further endpoint documentation is to be added, copy and paste the following template to the bottom of the README and fill out.   
   
---
Copy and Paste Example below ⌄⌄⌄
### <Title of Endpoint Example: (Get a User)>


```http
POST https://gaybe-safe-haven.herokuapp.com/api/v1/<endpoint-path-here>
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
   
}
```   
   
Example Response:   

```json

{
    
}
```

</details>

---

Copy and Paste Example above ^^^
   
---
    
<br>
<br>
   
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
