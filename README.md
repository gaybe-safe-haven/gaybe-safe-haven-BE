# Gaybe Safe Haven Backend API

   
A collection of endpoints exposed on this API with example requests and responses.      
Production Domain url: https://gaybe-safe-haven.herokuapp.com
   
## RESTful Endpoints

### Get a User


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
