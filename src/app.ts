import express, { Application, Request, Response } from 'express';
import session from 'express-session';
import connectSqlite3 from 'connect-sqlite3';
import cors from 'cors';
import itemRoutes from './routes/itemRoutes';
import authRoutes from './routes/authRoutes';
import dotenv from 'dotenv';
import path from 'path';
import sqlite3 from 'sqlite3';

// Enable verbose mode for debugging (optional)
sqlite3.verbose();

dotenv.config();

const app: Application = express();

const SQLiteStore = connectSqlite3(session);

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));
app.use(express.json()); 

app.use('/', itemRoutes);

const dbPath = path.resolve(__dirname, '../db');
console.log('Resolved database path:', dbPath);

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));

// Configure session middleware
app.use(session({
  store: new SQLiteStore({
      table: 'sessions',
      db: 'crafts_db',
      dir: dbPath
  }) as session.Store,
  secret: process.env.SESSION_SECRET || 'fallback-secret-key',
  resave: false, 
  saveUninitialized: false,
  cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: false, // Set true if using HTTPS in production
      httpOnly: true,
      sameSite: 'lax', // Protect against CSRF
  }
}));

app.use('/auth', authRoutes);

// Define routes
app.get('/', (req: Request, res: Response): void => {
  res.send('Successful response.');
});

export default app;