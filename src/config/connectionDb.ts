const { Pool } = require('pg');
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DB_URL,
   ssl: {
    rejectUnauthorized: false,
   },
});

pool.connect()
    .then(() => console.log('Connected to Postgres on Render'))
    .catch((err: unknown) => {
    if (err instanceof Error) {
        console.error('DB connection error: what', err.message);
    } else {
        console.error('DB connection error:', err);
    }
    });

export default pool;