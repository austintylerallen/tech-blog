const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const validPassword = await user.checkPassword(password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    req.session.user_id = user.id;
    req.session.email = user.email;
    res.redirect('/dashboard');
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json(err);
  }
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.render('signup', { error: 'Email already exists. Please use a different email.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    req.session.user_id = user.id;
    req.session.email = user.email;
    res.redirect('/dashboard');
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json(err);
  }
});

module.exports = router;
