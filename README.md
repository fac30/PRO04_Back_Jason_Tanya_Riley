# Craft & Graft

> Premier purveyors of playful paraphenalia

## Setup

- Step 1: Install dependencies:

```zsh
	npm install
```

- Step 2: Start the development server:

```zsh
	npm run dev
```

- Step 3: Build for production:

```zsh
	npm run build
```

## Project Structure

```
Craft-Craft/
│
├── src/
│   ├── controllers/       # Define functions to handle requests
│   │   └── itemController.js
│   │
│   ├── models/            # SQLite database interactions
│   │   └── itemModel.js
│   │
│   ├── routes/            # Define API routes
│   │   └── itemRoutes.js
│   │
|   ├── db/                 # SQLite database file
|   |    |__crafts_db.sqlite
|   |
│   ├── config/            # Configuration (e.g., database connection)
│   │   └── db.js
│   ├── app.js                 # Main Express app setup
|   ├── server.js              # Start the server
|
|── dist/
|
├── node_modules/          # Dependencies (installed by npm)
├── package.json           # Project metadata and dependencies
├── package-lock.json      # Lock file for dependencies
|-- gitignore              
└── README.md              # Project documentation
```
