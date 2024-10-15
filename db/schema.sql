PRAGMA foreign_keys = ON;

BEGIN;

-- add the SQL logic for creating tables here

-- this table is just for example:
CREATE TABLE IF NOT EXISTS dummytable (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  description TEXT
);

COMMIT;

-- WHEN "CREATE TABLE" IS FILLED, JUST RUN THE COMMAND: ts-node src/models/dbInit.ts AND EVERYTHING TABLES will be created