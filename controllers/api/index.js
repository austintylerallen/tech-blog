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
const { createPost, getAllPosts, updatePost, deletePost, getPostById, createComment, getAllComments } = require('../postController');

// Define API endpoints for posts
router.post('/posts', createPost); // Create a new post
router.get('/posts', getAllPosts); // Retrieve all posts
router.get('/posts/:postId', getPostById); // Retrieve a single post by ID
router.put('/posts/:postId', updatePost); // Update a post
router.delete('/posts/:postId', deletePost); // Delete a post

// Define API endpoints for comments
router.post('/posts/:postId/comments', createComment); // Create a new comment for a post
router.get('/posts/:postId/comments', getAllComments); // Retrieve all comments for a post

module.exports = router;









