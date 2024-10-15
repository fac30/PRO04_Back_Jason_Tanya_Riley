// server.js
import app from './app'; 

const port: number = parseInt(process.env.PORT || '3000', 10);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});