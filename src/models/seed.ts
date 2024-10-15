import db from '../config/db';
import fs from 'fs';
import path from 'path';

const seedData: string = fs.readFileSync(path.resolve(process.cwd(), 'db/seed.sql'), 'utf-8');

// Execute the SQL schema to seed tables
db.exec(seedData, (err: Error | null) => {
  if (err) {
    console.error('Error seeding database:', err.message);
  } else {
    console.log('Database seeded successfully.');
  }
});

export default db;