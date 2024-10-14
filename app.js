/**
 * Handles Express app setup (middleware, routes, etc.) but doesn’t start the server. 
 */
const express = require('express');
const cors = require('cors');

const app = express();

// Enable All CORS Requests
app.use(cors());

// Define routes
app.get('/', (req, res) => {
  res.send('Successful response.');
});

module.exports = app;