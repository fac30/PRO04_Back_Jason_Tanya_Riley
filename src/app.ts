import express, { Application, Request, Response } from 'express';
//import session from 'express-session';
//import connectSqlite3 from 'connect-sqlite3';
import cors from 'cors';
import itemRoutes from './routes/itemRoutes';
import authRoutes from './routes/authRoutes';
import pool from './config/connectionDb';

import dotenv from 'dotenv';
import path from 'path';


//sqlite3.verbose();
dotenv.config();

const app: Application = express();
//const SQLiteStore = connectSqlite3(session);

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json()); 
//app.use('/', itemRoutes);
//app.use('/auth', authRoutes);
// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));

// const dbPath = path.resolve(__dirname, '../db');
// console.log('Resolved database path:', dbPath);



// // Configure session middleware
// app.use(session({
//   store: new SQLiteStore({
//       table: 'sessions',
//       db: 'crafts_db',
//       dir: dbPath,
//   }) as session.Store,
//   secret: process.env.SESSION_SECRET || 'fallback-secret-key',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//       maxAge: 1000 * 60 * 60 * 24,
//       secure: false, // Set to true if you're using HTTPS in production
//       httpOnly: true,
//       sameSite: 'lax',
//   }
// }));

// Define a test route to verify DB connection
app.get('/db-test', async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT NOW()'); // Test query to check DB connection
    res.json({ message: 'Database connection successful!', time: result.rows[0] });
  } catch (err) {
    console.error('Error querying the database:', err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Define root route
app.get('/', (req: Request, res: Response): void => {
  res.send('Successful response.');
});

export default app;