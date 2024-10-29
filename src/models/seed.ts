import pool from '../config/connectionDb';
import fs from 'fs';
import path from 'path';

const seedData: string = fs.readFileSync(path.resolve(process.cwd(), 'db/seed.sql'), 'utf-8');

const seedDatabase = async (): Promise<void> => {
  try {
    await pool.query('BEGIN');
    await pool.query(seedData);
    await pool.query('COMMIT');
    console.log('Data seeded successfully');

  } catch (err: unknown) {
    await pool.query('ROLLBACK'); //Reverts any changes if there’s an error, helping to keep the database in a consistent state.
    if (err instanceof Error) {
      console.error('Error seeding database:', err.message);
    } else {
      console.error('Error seeding database:', err);
    }
  } finally {
    await pool.end();
  }
};

export default seedDatabase;

// // Execute the SQL schema to seed tables
// db.exec(seedData, (err: Error | null) => {
//   if (err) {
//     console.error('Error seeding database:', err.message);
//   } else {
//     console.log('Database seeded successfully.');
//   }
// });

// export default db;