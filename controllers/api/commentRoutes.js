const router = require('express').Router();
const { createComment, getAllComments } = require('../postController');

router.post('/', createComment); // Create a new comment
router.get('/:postId', getAllComments); // Retrieve all comments for a post

module.exports = router;
