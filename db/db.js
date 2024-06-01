// db.js
require('dotenv').config();
const { Pool } = require('pg');

// Create a new Pool instance for database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Export functions to interact with the database
module.exports = {
  query: (text, params) => pool.query(text, params),
};
