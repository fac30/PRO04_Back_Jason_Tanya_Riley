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

psql -h dpg-csgc7j5ds78s7381p9i0-a.region.render.com -p 5432 -U gurtati -d crafts_db_crafts