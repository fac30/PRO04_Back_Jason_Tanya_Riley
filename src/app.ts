import express, { Application, Request, Response } from 'express';
import session from 'express-session';
import connectSqlite3 from 'connect-sqlite3';
import cors from 'cors';
import itemRoutes from './routes/itemRoutes';
import authRoutes from './routes/authRoutes';
import dotenv from 'dotenv';
import path from 'path';
import sqlite3 from 'sqlite3';
import { Sequelize } from 'sequelize-typescript';
//import sequelize  from './config/connectionDb';


sqlite3.verbose();
dotenv.config();

const app: Application = express();
const SQLiteStore = connectSqlite3(session);

app.use(cors({
  origin: 'http://localhost:5173',
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
      dir: dbPath,
  }) as session.Store,
  secret: process.env.SESSION_SECRET || 'fallback-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false, // Set to true if you're using HTTPS in production
      httpOnly: true,
      sameSite: 'lax',
  }
}));

let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: 'localhost',
      dialect: 'postgres',
    },
  );
}

app.use('/auth', authRoutes);

// Define routes
app.get('/', (req: Request, res: Response): void => {
  res.send('Successful response.');
});

export default app;