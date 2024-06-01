// const express = require('express');
// const router = express.Router();

// // Define your API routes here
// router.get('/test', (req, res) => {
//   res.send('API route is working!');
// });

// // Example route for fetching all blog posts
// router.get('/posts', (req, res) => {
//   // Logic to fetch all blog posts
//   res.json({ message: 'Fetching all blog posts' });
// });

// // Example route for creating a new blog post
// router.post('/posts', (req, res) => {
//   // Logic to create a new blog post
//   res.json({ message: 'Creating a new blog post' });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();

const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');

router.use('/posts', postRoutes); // Routes for handling posts
router.use('/comments', commentRoutes); // Routes for handling comments
router.use('/users', userRoutes); // Routes for handling users

router.get('/test', (req, res) => {
  res.send('API route is working!');
});

module.exports = router;





