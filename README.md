# Craft & Graft

> Premier purveyors of playful paraphenalia

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
│   ├── middleware/        # Custom middleware (auth, validation, etc.)
│   │   └── logger.js
│   │
│   ├── config/            # Configuration (e.g., database connection)
│   │   └── db.js
│
├── db/                    # SQLite database file
│   └── mydatabase.sqlite
│
├── app.js                 # Main Express app setup
├── server.js              # Start the server
├── node_modules/          # Dependencies (installed by npm)
├── package.json           # Project metadata and dependencies
├── package-lock.json      # Lock file for dependencies
|-- gitignore              
└── README.md              # Project documentation
```
