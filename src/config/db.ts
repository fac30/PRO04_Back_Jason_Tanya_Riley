import sqlite3 from 'sqlite3';
import path from 'path';

sqlite3.verbose();

// Open a persistent database stored in the 'db' directory
const dbPath: string = path.resolve(__dirname, '../../db/crafts_db.sqlite');

const db: sqlite3.Database = new sqlite3.Database(dbPath, (err: Error | null) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the persistent SQLite database.');
  }
});

export default db;