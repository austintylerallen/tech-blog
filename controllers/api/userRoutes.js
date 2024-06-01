const express = require('express');
const router = express.Router();
const db = require('../../db/db');

// Route to get all users
router.get('/', (req, res) => {
  db.query('SELECT * FROM users')
    .then((result) => {
      res.json(result.rows);
    })
    .catch((error) => {
      console.error('Error getting users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Route to create a new user
router.post('/', (req, res) => {
  const { email, password } = req.body;
  db.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, password])
    .then(() => {
      res.status(201).json({ message: 'User created successfully' });
    })
    .catch((error) => {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

module.exports = router;
