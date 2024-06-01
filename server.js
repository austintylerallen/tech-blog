const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const session = require('express-session'); // Add this line if using sessions
const app = express();
const routes = require('./controllers'); // Import the main router

// Set up Handlebars as the view engine
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up session middleware if using sessions
app.use(session({
  secret: '163f4bea10323fc8047e19ad8ccaa0383b1073c43080c053b0ac957e8af02689b4410d5cc6d4984ff91411ca7ecfc84c4f9f8f9816e5bd3295d6667462039f4d',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using https
}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the main router for all routes
app.use(routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).send('Sorry, we cannot find that!');
});

// Set the port for the server
const PORT = process.env.PORT || 3001;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
