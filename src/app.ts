import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import itemRoutes from './routes/itemRoutes';
import authRoutes from './routes/authRoutes';
import session from 'express-session';
import pool from './config/connectionDb';
import pgSession from 'connect-pg-simple';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/', itemRoutes);
app.use('/', authRoutes);

// Set up session middleware to use PostgreSQL as the session store
app.use(session({
  store: new (pgSession(session))({
    pool: pool,               
    tableName: 'sessions',     
  }),
  secret: process.env.SESSION_SECRET || 'fallback-secret-key', // Replace with a secure secret in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,  // 1 day
    secure: false,                // Set to true if using HTTPS in production
    httpOnly: true,
    sameSite: 'lax',
  },
}));


// // Define a test route to verify DB connection
// app.get('/db-test', async (req: Request, res: Response): Promise<void> => {
//   try {
//     const result = await pool.query('SELECT NOW()'); // Test query to check DB connection
//     res.json({ message: 'Database connection successful!', time: result.rows[0] });
//   } catch (err) {
//     console.error('Error querying the database:', err);
//     res.status(500).json({ error: 'Database connection failed' });
//   }
// });

// Define root route
app.get('/', (req: Request, res: Response): void => {
  res.send('Successful response.');
});

export default app;