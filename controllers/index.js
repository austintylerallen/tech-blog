const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');
const bcrypt = require('bcrypt');

router.use('/api', require('./api')); // Ensure this line is correct
router.use('/auth', require('./authRoutes'));

router.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

router.get('/dashboard', async (req, res) => {
  try {
    const postsData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: Comment }]
    });

    const posts = postsData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      email: req.session.email,
      user_id: req.session.user_id,
      posts,
      title: 'Dashboard',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Sign Up' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user && await user.checkPassword(password)) {
      req.session.user_id = user.id;
      req.session.email = user.email;
      res.redirect('/dashboard');
    } else {
      res.render('login', { error: 'Invalid email or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.render('signup', { error: 'Email already exists. Please use a different email.' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hashedPassword });
      req.session.user_id = user.id;
      req.session.email = user.email;
      res.redirect('/dashboard');
    }
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json(err);
  }
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Failed to destroy session during logout:', err);
        return res.status(500).send('Failed to log out.');
      }
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
