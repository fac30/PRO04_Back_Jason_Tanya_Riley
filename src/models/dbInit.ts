import db from '../config/db';
import fs from 'fs';
import path from 'path';

const schema: string = fs.readFileSync(path.resolve(process.cwd(), 'db/schema.sql'), 'utf-8');

// Execute the SQL schema to create tables and indexes
db.exec(schema, (err: Error | null) => {
  if (err) {
    console.error('Error creating tables:', err.message);
  } else {
    console.log('Tables created successfully or already exist.');
  }
});

export default db;