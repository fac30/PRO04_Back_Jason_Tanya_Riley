// server.js
import app from './app'; 
import initializeDatabase from './models/dbInit';

const port: number = parseInt(process.env.PORT || '3000', 10);

// // Initialize the database tables
// initializeDatabase();

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});