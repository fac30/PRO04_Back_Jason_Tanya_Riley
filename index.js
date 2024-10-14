const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

/** Enable All CORS Requests */
app.use(cors());

app.get('/', (req, res) => {
  res.send('Successful response.');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});