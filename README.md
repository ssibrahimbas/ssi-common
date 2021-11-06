# Ssi Common

<hr>

This package is developed entirely with TypeScript. It can be used with TypeScript or JavaScript.

<hr>

## Documentation

<br>

### Setup

```terminal
$ npm install @ssi/common
```

Then go to the main file of your project:

```javascript
// server.js

// + ES6:
import { ssiResponseMiddleware, ssiErrorHandlerMiddleware } from "@ssi/common";

app.use(ssiResponseMiddleware);
app.use(ssiErrorHandlerMiddleware);

// ES5:
const { ssiResponseMiddleware, ssiErrorHandlerMiddleware } = require("@ssi/common");

app.use(ssiResponseMiddleware);
app.use(ssiErrorHandlerMiddleware);
```

The order above is very important! Because ```ssiErrorHandlerMiddleware``` is dependent on ```ssiResponseMiddleware``` to work properly.

<br>

<hr>

<br>

### Using Custom Error

The use of NotAuthorizedError is shown here as an example. Scroll to the bottom of its documentation to see the full list of errors currently available.

```javascript
// +ES6:
import { NotAuthorizedError } from "@ssi/common";

const someFunc = () => {
    if(!someCondition) {
        throw new NotAuthorizedError();
    }
}

// ES5:
const { NotAuthorizedError } require("@ssi/common");

const someFunc = () => {
    if(!someCondition) {
        throw new NotAuthorizedError();
    }
}

// output

{
    status: 401,
    success: false,
    message: "Not authorized",
}

```

<br>

<hr>

<br>

### Wrapper Function Usage

There are 2 wrapper functions available. ```asyncWrapper``` and ```errorWrapper```


```asyncWrapper``` is a structure that you can use for any of your asynchronous operations. For example, if you don't want to try-catch a function you wrote to connect to the database, ```asyncWrapper``` is for you!

``errorWrapper`` is a construct that wraps any of your __express middleware__ functions. It asks for a function that takes req, res and next functions as parameters from express -you can examine the source codes for detailed information-.

<hr>

#### Using asyncWrapper

<br>

I used this function in a template project I developed with postgreSQL as follows:

```javascript
import { asyncWrapper } from "@ssi/common";

const update = asyncWrapper(async (user: UserType): Promise<void> => {
    const query = {
        text: "UPDATE users SET name = $1, email = $2",
        values: [user.name, user.email]
    };
    await poolPostgres.query<UserType>(query);
})

```

If any error occurs while processing the query, the user will not receive a bad message. Instead of :

```json
{
    status: 400,
    success: false,
    message: "something went wrong"
}
```

A BadRequest is returned.

<hr>

#### Using errorWrapper

<br>

```javascript
import { errorWrapper } from "@ssi/common";

const register = errorWrapper(async(req, res, next) => {
    const {email, password} = req.body;

    const user = User.create({email, password});

    return res.Created("User created successfully.");
});
```

This much!

<br>

<hr>

<br>

### Available Error List

<br>

> BadRequestError

> databaseConnectionError

> NotFoundError

> NotAuthorizedError

<br>

### Available Response List

<br>

> Success

> SuccessData

> Error

> ErrorData

> Created

> CreatedData

> Unauthorized

> Forbidden

> BadRequest

> NotFound

> InternalServer

