const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection'); // Import the sequelize instance
require('dotenv').config();

const routes = require('./controllers');

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Handlebars as the view engine
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Synchronize models
sequelize.sync().then(() => {
  console.log('Database synchronized');
  
  // Set up session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({ db: sequelize }),
    cookie: { secure: false } // Set to true if using https
  }));

  // Serve static files from the 'public' directory
  app.use(express.static(path.join(__dirname, 'public')));

  // Use the main router for all routes
  app.use(routes);

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error('Error occurred:', err.stack);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Something went wrong!' }); // Ensure JSON response
    }
  });

  // Handle 404 errors
  app.use((req, res, next) => {
    res.status(404).json({ error: 'Sorry, we cannot find that!' }); // Ensure JSON response
  });

  // Set the port for the server
  const PORT = process.env.PORT || 3001;

  // Start the server and listen on the specified port
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// PostgreSQL connection test
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Adjust this setting based on your SSL requirements
  }
});

// Example route to test the database connection
app.get('/db-test', (req, res) => {
  pool.query('SELECT NOW()', (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      if (!res.headersSent) {
        res.status(500).send(err);
      }
    } else {
      res.send(result.rows);
    }
  });
});
