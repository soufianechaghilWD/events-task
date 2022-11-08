# Deployed Link :
    https://events-task-express.herokuapp.com/


* Create a user **POST request to the endpoint: /api/users** :
        The body: 
```json
        {
            "email": "test@gmail.com",
            "name": "test",
            "password": "test"
        }
```


* The user can login using a **POST request to the endpoint /api/users/session** and adding a body containing the email and the password. Example:
        The body: 
```json
        {
        "email": "test@gmail.com",
        "password": "test"
        }
```
    If something went wrong the user receives a message defining the problem otherwise the user gets back a token . Example: 
```json
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX..."
        }
```


* The user can get the list of all the events available using a **GET request to the endpoint /api/events**:

* The user can save an event using a **PUT request to the endpoint /api/users/event/:eventId** also the user needs to provide a valid token in the body, params or the header

* The user can delete an event from the saved list using a **DELETE request to the endpoint /api/users/event/:eventId**

* The user can get the list of the saved events using a **GET request to the endpoint /api/users/events**

* The user can search by a keyword using a **GET request to the endpoint /api/search/:keyword**

* The admin can add an event using a **POST request to the endpoint /api/events** and providing a body 
```json
        {
            "name": "The 28th Annual South African Music Awards",
            "description": "The 28th South African Music Awards has partnered with TikTok for the first time to promote the ceremony.[4][5] Three categories; Record of the Year, Music Video of the Year, SAMPRA Artist of the Year, were announced on June 3, 2022",
            "date": "2022-08-28",
            "artist": "Zakes",
            "location": "Sun city, South Africa",
            "type": "Techno",
            "adminCred": "admin"
        }
```