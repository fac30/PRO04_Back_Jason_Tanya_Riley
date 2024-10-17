# Craft & Graft

This is an Express service for item management, using SQLite as the database with TypeScript. It includes separate folders for controllers, models, routes, and database initialization, with SQL scripts for schema and data seeding.

## Project Backend Structure

This document describes the folder and file structure of the backend for the project:

```src
├── package-lock.json
├── package.json
├── src
│   ├── app.ts
│   ├── config
│   │   └── db.ts
│   ├── controllers
│   │   └── itemController.ts
│   ├── models
│   │   ├── dbInit.ts
│   │   ├── itemModel.ts
│   │   └── seed.ts
│   ├── routes
│   │   └── itemRoutes.ts
│   └── server.ts
└── tsconfig.json
db
├── crafts_db.sqlite
├── database.erd.txt
├── schema.sql
└── seed.sql
```

### Folders

#### `db/`

The db folder contains all files related to the database, including scripts for schema definition, database seeding, and the actual database file.

- `crafts_db.sqlite`: The SQLite database file where all data for the project is stored.
- `database.erd.txt`: A text file that contains an Entity Relationship Diagram (ERD) description, showing the relationships between tables in the database.
- `schema.sql`: SQL script that defines the schema for the database, creating the necessary tables.
- `seed.sql`: SQL script that contains seed data, used to populate the database with initial data for testing or development purposes.

#### `src/`

The src directory contains all the main source files for the project. It is structured into subfolders such as config, controllers, models, routes, and files that initialize the server.

- `config/db.ts`
	This file handles the configuration and connection to the SQLite database. It initializes the database and provides methods for interacting with it.

#### `controllers/`

This folder contains the logic for handling API requests. Controllers are responsible for processing incoming HTTP requests, interacting with models, and returning responses.

- `itemController.ts`: Handles all the logic related to “items” in the application. This controller defines methods for retrieving, creating, updating, and deleting items. It serves as an intermediary between the routes and models.

#### `models/`

The models directory defines the structure and logic for interacting with the database. Models represent the different entities (or tables) in the database.

- `dbInit.ts`: This file initializes the database, ensuring that the required tables are created if they do not exist. It can be run during the setup to ensure the database structure is in place.
- `itemModel.ts`: Defines the model for the Item entity. It contains methods to interact with the items table in the database, such as adding, retrieving, updating, or deleting records.
- `seed.ts`: Contains logic for seeding the database with initial data. This script can be executed during the setup process to populate the database with example data.

#### `routes/`

The routes folder defines the endpoints (API routes) of the application. These routes map incoming HTTP requests to specific controller methods.

- `itemRoutes.ts`: This file defines the routes related to the items entity. For example, it could include routes like /items, /items/:id, and map them to methods in itemController.ts.

## How to Run the Project

1. Clone the repository: `git clone https://github.com/fac30/PRO04_Back_Jason_Tanya_Riley.git`
2. Navigate to the project directory: cd PRO04_Back_Jason_Tanya_Riley
3. Install dependencies: `npm install`
4. Database setup:
	- Ensure that the `crafts_db.sqlite` file exists in the `./db` folder.
	- If you need to initialize the schema, run the `schema.sql` script, or execute the `dbInit.ts` script to initialize the tables programmatically.
	- Optionally, you can seed the database by running the `seed.sql` script or using the `seed.ts` script for programmatic seeding.
5. Start the server:
   - `npm run build`
   - `npm start`
6. The server will be running at: `http://localhost:<PORT>`
