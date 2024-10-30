import pool from '../config/connectionDb';
import fs from 'fs';
import path from 'path';

const schema: string = fs.readFileSync(path.resolve(process.cwd(), 'db/schema.sql'), 'utf-8');

const initializeDatabase = async (): Promise<void> => {
  try {
    await pool.query(schema);
    console.log('Tables created successfully (if they did not already exist)');
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error creating tables:', err.message);
    } else {
      console.error('Error creating tables:', err);
    }
  }
};

export default initializeDatabase;

//copy and run this command in your terminal to open and see the structure of our Database: 

//psql <link from .env DB_URL>
//this is a command to see the whole list of tables: \dt
//to see the specific table: \d <table_name>
//to quit from this mode: \q