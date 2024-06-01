// controllers/api/commentRoutes.js
const express = require('express');
const router = express.Router();
const { createComment, getAllCommentsForPost } = require('../../controllers/commentController');

router.post('/', createComment); // Create a new comment
router.get('/:postId', getAllCommentsForPost); // Retrieve all comments for a post

module.exports = router;
