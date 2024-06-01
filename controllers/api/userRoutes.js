const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const db = require('../../db/db');

// Route to create a new user
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: 'Email already exists. Please use a different email.' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ email, password: hashedPassword });
      req.session.user_id = newUser.id;
      req.session.email = newUser.email;
      res.status(201).json(newUser);
    }
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.user_id = user.id;
      req.session.email = user.email;
      res.status(200).json({ message: 'Logged in successfully' });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
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

module.exports = router;
