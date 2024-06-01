// const express = require('express');
// const router = express.Router();

// // Import the controller functions for handling posts and comments
// const { createPost, getAllPosts, createComment, getAllComments } = require('../postController');

// // Define API endpoints for posts
// router.post('/posts', createPost); // Create a new post
// router.get('/posts', getAllPosts); // Retrieve all posts

// // Define API endpoints for comments
// router.post('/posts/:postId/comments', createComment); // Create a new comment for a post
// router.get('/posts/:postId/comments', getAllComments); // Retrieve all comments for a post

// module.exports = router;


// controllers/api/postRoutes.js
// controllers/api/postRoutes.js
// controllers/api/postRoutes.js

const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, updatePost, deletePost, getPostById, createComment, getAllComments } = require('../postController');

// Define API endpoints for posts
router.post('/', createPost); // Create a new post
router.get('/', getAllPosts); // Retrieve all posts
router.get('/:postId', getPostById); // Retrieve a single post by ID
router.put('/:postId', updatePost); // Update a post
router.delete('/:postId', deletePost); // Delete a post

// Define API endpoints for comments
router.post('/:postId/comments', createComment); // Create a new comment for a post
router.get('/:postId/comments', getAllComments); // Retrieve all comments for a post

module.exports = router;



