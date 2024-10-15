const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Open a persistent database stored in the 'db' directory
let db = new sqlite3.Database(path.resolve(__dirname, '../db/crafts_db.sqlite'), (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the persistent SQLite database.');
});

module.exports = db;