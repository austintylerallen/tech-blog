const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request received:', { email, password });
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.error('User not found:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.error('Invalid password for user:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    req.session.user_id = user.id;
    req.session.email = user.email;
    req.session.logged_in = true;
    console.log('Login successful, session set:', req.session);
    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json(err);
  }
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  console.log('Signup request received:', { email, password });
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.error('Email already exists:', email);
      return res.status(400).json({ error: 'Email already exists. Please use a different email.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    req.session.user_id = user.id;
    req.session.email = user.email;
    req.session.logged_in = true;
    console.log('Signup successful, session set:', req.session);
    res.json({ message: 'Signup successful' });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json(err);
  }
});

module.exports = router;
