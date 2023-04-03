
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
    "name": "Test Shelter 4",
    "streetAddress": "Test Street4",
    "state": "Test State4",
    "zip": 12345235,
    "phoneNumber": "Test Phone4",
    "websiteUrl": "www.fake.com4"
}
```   
   
Example Response:   

```json

{
    "data": {
        "id": 4,
        "type": "shelter",
        "attributes": {
            "name": "Test Shelter 4",
            "streetAddress": "Test Street4",
            "state": "Test State4",
            "zip": 12345235,
            "websiteUrl": "www.fake.com4",
            "phoneNumber": "Test Phone4",
            "verified": false
        }
    }
}
```

</details>

---   

### Get All Shelters


```http
POST https://gaybe-safe-haven.herokuapp.com/api/v1/shelters
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
                "name": "Golden Sun",
                "streetAddress": "1234 Black St",
                "state": "NY",
                "zip": 78123,
                "websiteUrl": null,
                "phoneNumber": "2134568765",
                "verified": false,
                "avgStaff": null,
                "avgClean": null,
                "avgSafety": null
            }
        },
        {
            "id": 2,
            "type": "shelter",
            "attributes": {
                "name": "Test Shelter 2",
                "streetAddress": "Test Street",
                "state": "Test State",
                "zip": 12345235,
                "websiteUrl": null,
                "phoneNumber": "Test Phone",
                "verified": false,
                "avgStaff": null,
                "avgClean": null,
                "avgSafety": null
            }
        },
        {
            "id": 3,
            "type": "shelter",
            "attributes": {
                "name": "Test Shelter 2",
                "streetAddress": "Test Street",
                "state": "Test State",
                "zip": 12345235,
                "websiteUrl": "www.fake.com",
                "phoneNumber": "Test Phone",
                "verified": false,
                "avgStaff": null,
                "avgClean": null,
                "avgSafety": null
            }
        },
        {
            "id": 4,
            "type": "shelter",
            "attributes": {
                "name": "Test Shelter 4",
                "streetAddress": "Test Street4",
                "state": "Test State4",
                "zip": 12345235,
                "websiteUrl": "www.fake.com4",
                "phoneNumber": "Test Phone4",
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
