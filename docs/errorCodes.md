| Code| Meaning |
| ---- | --- |
| | **General** |
| 200  | The request was successful.
| 400  | The request's body does not contain all the necessary parameters to execute the action.
| 401  | A logged in session is required to access the requested resource.
| 403  | The current user lacks the permission to retrieve data.
| 404  | The requested resource could not be found on the server.
| 429  | Your client sent too many request in the time range specified in the configuration file and has been blocked for a specified amount of time.
| 500  | An internal server error occurred. Check the database connection and/or configuration file.
| | **Users**
| 1001 | The provided email is already in use.
| 1002 | The input is not a valid email address.
| 1003 | The provided password does not meet the requirements. A password has to be at least 8 characters long and contain at least an uppercase and lowercase character, a number and a special character.
| | **Authentication**
| 1011 | The client is already logged in. Use /api/auth/logout to logout.
| 1012 | Email and/or password is/are incorrect.