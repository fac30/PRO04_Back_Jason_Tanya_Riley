# Craft & Graft

This project is an Express-based service for managing products, built with TypeScript and using PostgreSQL as the database. The project structure is organized with dedicated folders for controllers, models, routes, and database initialization. Additionally, PostgreSQL scripts are included for schema setup and data seeding.

## Project Backend Structure

This document outlines the folder and file organization of the project’s backend:

```
├── package-lock.json
├── package.json
├── src
│   ├── app.ts
│   ├── config
│   │   └── connectionDb.ts
│   ├── controllers
│   │   ├── itemController.ts
│   │   ├── log-in.ts
│	│	├── sign-up.ts
│	│	└── log-out.ts
│   ├── models
│   │   ├── dbInit.ts
│   │   ├── itemModel.ts
│   │   ├── seed.ts
│   │   └── userModel.ts
│   ├── routes
│   │   ├── authRoutes.ts
│   │   └── itemRoutes.ts
│   └── server.ts
└── tsconfig.json
db
├── database.erd.txt
├── schema.sql
└── seed.sql
```

## Folders

### `db/`

The db folder contains all files related to the PostgreSQL database setup, including scripts for schema definition, data seeding, and database configuration.

- `database.erd.txt`: A text file describing the Entity Relationship Diagram (ERD), illustrating the relationships between tables in the PostgreSQL database.
- `schema.sql`: An SQL script that defines the database schema, setting up the required tables and relationships.
- `seed.sql`: An SQL script with seed data to initialize the database with sample data for testing or development.

### `src/`

The src directory contains all the main source files for the project. It is structured into subfolders such as config, controllers, models, routes, and files that initialize the server.

#### `config/`

- `connectionDb.ts`
	This file manages the configuration and connection to the PostgreSQL database. It establishes the initial connection, initializes the database.

#### `controllers/`

This folder contains the logic for handling API requests. Controllers are responsible for processing incoming HTTP requests, interacting with models, and returning responses.

- `itemController.ts`: Handles all the logic related to “items” in the application. This controller defines methods for retrieving, creating, updating, and deleting items. It serves as an intermediary between the routes and models.

-  `sign-up.ts`: Manages the user registration process. This file defines the signUp function, which handles user creation by receiving username, email, and password from the request. It hashes the password using bcrypt for security and calls the createBuyer method to save the new user in the database. If successful, it sends a confirmation response; if not, it logs and returns an error message. This file acts as a bridge between the user registration route and the user model.

- `log-in.ts`: Manages user login and session creation. This file defines the logIn function, which validates user credentials by comparing the provided password with the stored hashed password. Upon successful authentication, it initializes a session by saving the user’s ID and email in the session data. If the login fails due to incorrect credentials or a server issue, it sends an appropriate error response. This file acts as an intermediary between the login route and the user model, ensuring session persistence for authenticated users.

- `log-out.ts`: Handles user logout and session termination. This file defines the logOut function, which destroys the active session to log the user out. It also clears the session cookie from the client by removing connect.sid, ensuring the session is completely terminated. If the logout process encounters an error, it logs the error and returns an appropriate response. This file serves as a link between the logout route and session management, ensuring secure and clean session closure for logged-out users.

#### `models/`

The models directory defines the structure and logic for interacting with the database. Models represent the different entities (or tables) in the database.

- `dbInit.ts`: Manages database initialization by creating tables according to the predefined schema. This file defines the initializeDatabase function, which reads the SQL schema from db/schema.sql and executes it using the PostgreSQL connection pool. If the tables are successfully created (or already exist), it logs a confirmation message. In case of errors during table creation, it catches and logs the error details. This file links the database setup process with the main application, ensuring that required tables are initialized.

- `itemModel.ts`: Defines the data model and database operations for “products” in the application. This file includes the Product interface to type-check product data and provides functions to interact with the products table in the PostgreSQL database:
	•	getAllProducts: Retrieves all products from the database.
	•	getProductById: Fetches a specific product by its ID.
	•	addProduct: Adds a new product to the database and returns the ID of the created entry.

- `seed.ts`: Contains logic for seeding the database with initial data. This script can be executed during the setup process to populate the database with example data.

- `userModel.ts`: Manages database interactions for user-related operations, specifically for “buyers.” This file defines the Buyer interface to represent buyer attributes and provides methods for accessing and manipulating user data in the PostgreSQL database:
	•	createBuyer: Adds a new buyer to the buyer table with a username, email, and hashed password. Returns true if the insertion is successful.
	•	getBuyerByEmail: Retrieves a buyer’s ID, email, and hashed password based on the provided email. Returns null if no user is found.

#### `routes/`

The routes folder defines the endpoints (API routes) of the application. These routes map incoming HTTP requests to specific controller methods.

- `itemRoutes.ts`: This file defines the routes related to the items entity. For example, it could include routes like /products, /products/:id, and map them to methods in itemController.ts.

- `authRoutes.ts`: Defines the authentication routes for user sign-up, login, and logout. This file imports the signUp, logIn, and logOut controller functions and maps them to the respective endpoints:
	•	/sign-up: Handles new user registration.
	•	/log-in: Manages user login and session creation.
	•	/log-out: Manages user logout and session termination.


## How to Run the Project

1. Clone the repository: `git clone https://github.com/fac30/PRO04_Back_Jason_Tanya_Riley.git`
2. Navigate to the project directory: `cd PRO04_Back_Jason_Tanya_Riley`
3. Install dependencies: `npm install`
4. Database setup:
	- Ensure the PostgreSQL database is accessible: Your backend is configured to connect to a PostgreSQL instance hosted on [Render.com](render.com). Confirm that the connection URL and credentials are correctly set in the .env file using the environment variables provided by [Render](render.com).
	- Initialize the schema (if necessary): The database schema should be initialized on Render, but you can run the dbInit.ts script locally if you need to set up the schema on a fresh instance: `ts-node ./src/models/dbInit.ts`
	- Optionally, you can seed the database by running the `seed.sql` script:
	`ts-node ./src/models/seed.ts`
5. Start the server locally:
   - Build the project (TypeScript): `npm run build` 
   - Run the server: `npm start`

## Endpoints

### **PRODUCTS ENDPOINTS**

### Get All Products:

- Endpoint: GET /products
- Example request: `http://localhost:3000/products`
- Description: Fetches a list of all available products.
- Response:

  - 200 OK: Returns an array of products objects.
  - 404 Not Found: If no products are found.

  - Example response:

```ts
[
    {
        "id": 1,
        "name": "Football Boots",
        "photo_link": "https://example.com/football-boots.jpg",
        "strapline": "Professional-grade football boots",
        "description": "High-performance footwear designed for serious football players",
        "stock_level": 100,
        "location": 1,
        "orders": 1,
        "reviews": null,
        "activities": 1
    },
    {
        "id": 2,
        "name": "Goalkeeper Gloves",
        "photo_link": "https://example.com/goalkeeper-gloves.jpg",
        "strapline": "Pro-level goalkeeper gloves",
        "description": "High-grip gloves designed for maximum ball control and hand protection",
        "stock_level": 100,
        "location": 1,
        "orders": 1,
        "reviews": null,
        "activities": 1
    },
]
```
### Get Product By ID

- Endpoint: GET /products (with id query)
- Example request: `http://localhost:3000/products?id=3`
- Description: Fetches details of a specific product by their unique ID.
- Parameters:
  - id (path parameter): The ID of the product.
- Response:

  - 200 OK: Returns the product object if found.
  - 404 Not Found: If the product with the given ID does not exist.

- Example response:

```ts
{
    "id": 3,
    "name": "Premium Acrylic Paint Set",
    "photo_link": "https://example.com/acrylic-paint-set.jpg",
    "strapline": "Vibrant colors for artistic expression",
    "description": "High-quality acrylic paint set with 24 rich, long-lasting colors perfect for canvas, wood, and more",
    "stock_level": 100,
    "location": 1,
    "orders": 2,
    "reviews": null,
    "activities": 2
}
```

### **AUTHENTICATION ENDPOINTS**

### Sign-Up user:

- Endpoint: POST /auth/sign-up
- Example request: `http://localhost:3000/auth/sign-up`
- Description: Registers a new user with a username, email, and password.
- Parameters(in request body):
  - username (string): The user’s username.
  - email (string): The user’s email address.
  - password (string): The user’s password.

- Response:
  - 201 OK: Returns a message: 'User created successfully. Please log in.'
  - 500 Internal Server Error: Returns an error message: 'Server error, unable to create user.'

### Log-In user:

- Endpoint: POST /auth/log-in
- Example request: `http://localhost:3000/auth/log-in`
- Description: Authenticates a user by verifying their email and password. If successful, a session is created and user information is stored in the session data.
- Parameters(in request body):
  - email (string): The user’s email address.
  - password (string): The user’s password.

- Response:
  - 200 OK: Returns a message: 'Login successful', along with the user data { id, email } in the response.
  - 401 Unauthorized: Returns an error message: 'Login failed: Incorrect password.' if the password does not match.
  - 404 Not Found: Returns an error message: 'User not found' if no user exists with the provided email.
  - 500 Internal Server Error: Returns an error message: 'Server error during login' if there is a server or session initialization issue.

### Log-Out user:

- Endpoint: POST /auth/log-out
- Example request: `http://localhost:3000/auth/log-out`
- Description: Logs the user out by destroying their session and clearing the session cookie.
- Parameters: NONE

- Response:
  -	200 OK: Returns a message: 'Logout successful' after successfully destroying the session and clearing the cookie.
  - 500 Internal Server Error: Returns an error message: 'Logout failed' if an error occurs while attempting to destroy the session.


## Storing Session

In this section, we will explain how to configure cookie settings when using express-session in an Express application.

```
session({
      store: new (pgSession(session))({
          pool: pool,          // Use PostgreSQL as the session store
          tableName: 'sessions' // Use your sessions table in PostgreSQL
      }),
      secret: process.env.SESSION_SECRET || 'fallback-secret-key', // Use a secure secret in production
      resave: false,
      saveUninitialized: false,
      cookie: {
          maxAge: 1000 * 60 * 60 * 24, // 1 day
          secure: false, // Set to true if using HTTPS in production
          httpOnly: true,
          sameSite: 'lax',
      }
  })
```
- **secure**: Set this to true when serving the application over HTTPS. This ensures that the cookie is only sent over secure connections, protecting it from being intercepted during transmission.

- **maxAge**: Defines how long the cookie should last before it expires. In this case, it's set to (1000 * 60 * 60 * 24) milliseconds, which equals one day. After the cookie expires, the user will be logged out automatically.

- **httpOnly**: This setting ensures that the cookie cannot be accessed through client-side JavaScript. It's a security feature to prevent certain attacks, such as XSS (Cross-Site Scripting).

Next, below is an example of how cookies is used in this project. Cookies allow you to store small pieces of data in the user's browser, which can be used for session management or other purposes. 

### Creating User Session

#### User Login and Session Initialization

- The user sends a login request (usually with email and password) to the server.
- The server validates the user’s credentials (e.g., by verifying their email and password against database records).
- If the credentials are correct, the server establishes a session for the user.

#### Session Creation in Memory

- Upon successful login, the server calls req.session, creating a new session object for the user.
- req.session is a part of express-session, which provides a unique session ID to the user.
- Any data that needs to persist for the user’s session (e.g., user.id, user.email) can be stored within req.session. This data will be available across multiple requests as long as the session is active.

```
if (req.session) {
    req.session.user = {
        id: buyer.id,
        email: buyer.email
    };
}
```
#### Saving the Session in PostgreSQL

- With the pgSession middleware configured, the session data will be stored in PostgreSQL automatically.
- When the server creates req.session for the user, pgSession saves this session data to the sessions table in PostgreSQL.
- The sessions table typically contains fields such as session_id, data, and expires:
- session_id: A unique identifier for the session, usually a long random string.
- data: Serialized JSON data representing the session’s contents, including any properties stored in req.session (e.g., user.id, user.email).
- expires: A timestamp indicating when the session will expire, based on the cookie.maxAge setting.

#### Session Retrieval on Subsequent Requests

- On subsequent requests, the client sends the session cookie (usually containing the session ID) to the server.
- express-session reads this session ID from the cookie and retrieves the session data from the PostgreSQL sessions table using pgSession.
- If the session is valid (not expired), the server loads the session data into req.session, making it available for the request lifecycle.
- For example, req.session.user.id and req.session.user.email can be accessed to verify the user’s identity and manage permissions.

#### Session Expiration and Cleanup

- The session will automatically expire based on the maxAge setting in the cookie configuration.
- When a session expires, pgSession marks it as invalid in the database, and the sessions table will be cleared of expired sessions periodically.

## Deployment

The project is currently deployed on [Render.com](render.com). To deploy your own instance, create an account on Render, and from your dashboard, click '+ NEW' in the top navigation bar. Select "Web Service" and choose the Git repository you wish to deploy.

### Deployment Settings

-   Root Directory: Set the root directory to dist, where the compiled files are output after building the project. If you need to change the root directory, update the build and start commands in your project, commit the changes, and push them to your repository before deployment.
-	Commands:
	-	Build Command: Use `npm run build` to compile TypeScript files.
	-	Start Command: Use `npm run start` to start the server.
-	Instance Type: Select the instance tier that best meets your requirements. Keep in mind that if you choose the free tier, resources aren’t reserved for your project, which may result in a short delay (around one minute) each time the service spins up after inactivity.
-	Environment Variables:
	-	Specify required environment variables, including `PORT` and the port number [Render.com](render.com) assigns to your project.
	-	Add any other variables (e.g., database credentials or secrets) as needed for connecting to external resources like your PostgreSQL instance on Render.