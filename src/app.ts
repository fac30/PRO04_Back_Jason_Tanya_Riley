/**
 * Handles Express app setup (middleware, routes, etc.) but doesn’t start the server. 
 */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import './models/dbInit';  // Assuming this file just runs the schema.sql to create tables
import './models/seed';    // seeding the tables

const app: Application = express();

// Enable All CORS Requests
app.use(cors());

app.use(express.json()); 

// Define routes
app.get('/', (req: Request, res: Response): void => {
  res.send('Successful response.');
});


export default app;