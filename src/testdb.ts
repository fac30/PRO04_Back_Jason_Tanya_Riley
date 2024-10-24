import sqlite3 from 'sqlite3';
import session from 'express-session';
import connectSqlite3 from 'connect-sqlite3';
import path from 'path';

// Enable verbose mode for debugging (optional)
sqlite3.verbose();

// Resolve the path to the SQLite database
const dbPath = path.resolve(__dirname, '../db/crafts_db.sqlite');

// Open the SQLite database
const db = new sqlite3.Database(dbPath, (err: Error | null) => {
  if (err) {
    console.error('Error opening database manually:', err.message);
    return;
  }
  console.log('Connected to SQLite database manually.');
});

// Perform a simple query to check the connection
db.serialize(() => {
  db.each("SELECT name FROM products WHERE orders=2;", (err: Error | null, row: any) => {
    if (err) {
      console.error('Error running test query:', err.message);
    } else {
      console.log('Table name:', row.name);
    }
  });
});

// Close the database connection
db.close((err: Error | null) => {
  if (err) {
    console.error('Error closing the database:', err.message);
    return;
  }
  console.log('Closed SQLite database manually.');
});