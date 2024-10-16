/**
 * Handles Express app setup (middleware, routes, etc.) but doesn’t start the server. 
 */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import itemRoutes from './routes/itemRoutes';

// Uncomment the lines below if you need to create new tables or seed the database
// import './models/dbInit';
// import './models/seed';

const app: Application = express();

// Enable All CORS Requests
app.use(cors());

app.use(express.json()); 

app.use('/', itemRoutes);

// Define routes
app.get('/', (req: Request, res: Response): void => {
  res.send('Successful response.');
});

export default app;