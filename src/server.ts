// server.js
import app from './app'; 
//import initializeDatabase from './models/dbInit';
import seedDatabase from './models/seed';



const port: number = parseInt(process.env.PORT || '3000', 10);

// // Initialize the database tables
// initializeDatabase();

seedDatabase()
  .then(() => console.log('Seeding complete'))
  .catch((err) => console.error('Error in seeding process:', err));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});