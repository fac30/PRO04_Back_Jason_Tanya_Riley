const db = require('../config/db');
const fs = require('fs');
const path = require('path');

const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');

// Execute the SQL schema to create tables and indexes
db.exec(schema, (err) => {
  if (err) {
    console.error('Error creating tables:', err.message);
  } else {
    console.log('Tables created successfully or already exist.');
  }
});

module.exports = db;