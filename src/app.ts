import express, { Application, Request, Response } from 'express';
import session from 'express-session';
import connectSqlite3 from 'connect-sqlite3';
import cors from 'cors';
import itemRoutes from './routes/itemRoutes';
import authRoutes from './routes/authRoutes';

const dotenv = require('dotenv');
dotenv.config();

const app: Application = express();

const SQLiteStore = connectSqlite3(session);

app.use(cors());
app.use(express.json()); 

app.use('/', itemRoutes);

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));

// Configure session middleware
app.use(session({
  store: new SQLiteStore({
      db: '../db/crafts_db.sqlite',
      table: 'sessions',
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