


// authRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db/db');
const bcrypt = require('bcrypt');

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        
        if (user.rows.length > 0 && bcrypt.compareSync(password, user.rows[0].password)) {
            req.session.user_id = user.rows[0].id;  // Store userId in session
            req.session.email = user.rows[0].email;
            res.redirect('/dashboard');
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to handle logout and redirect to the home page
router.get('/logout', (req, res) => {
    // If you are using session, destroy the session
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error('Failed to destroy session during logout:', err);
          return res.status(500).send('Failed to log out.');
        }
        res.redirect('/'); // Redirect to the home page
      });
    } else {
      res.redirect('/'); // If no session, just redirect to home
    }
  });
  

module.exports = router;
