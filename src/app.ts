import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import itemRoutes from './routes/itemRoutes';
import authRoutes from './routes/authRoutes';
const signup = require("./controllers/sign-up.ts");
const login = require("./controllers/log-in.ts");

// Uncomment the lines below if you need to create new tables or seed the database
// import './models/dbInit';
// import './models/seed';

const app: Application = express();

app.use(cors());
app.use(express.json()); 

app.use('/', itemRoutes);
app.use('/auth', authRoutes);


// Define routes
app.get('/', (req: Request, res: Response): void => {
  res.send('Successful response.');
});

export default app;