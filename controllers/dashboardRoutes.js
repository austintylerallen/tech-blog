const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth'); // Ensure this middleware checks if the user is logged in

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [User], // Include User model if needed to fetch related data
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      email: req.session.email, // Pass email to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error('Error fetching dashboard:', err);
    res.status(500).json(err);
  }
});

module.exports = router;
