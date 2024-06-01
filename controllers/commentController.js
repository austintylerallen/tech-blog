// controllers/commentController.js
const db = require('../db/db');

// Create a new comment
exports.createComment = (req, res) => {
  const { content, userId, postId } = req.body;

  if (!content || !userId || !postId) {
    return res.status(400).json({ error: 'Content, userId, and postId are required' });
  }

  db.query('INSERT INTO comments (content, user_id, post_id) VALUES ($1, $2, $3) RETURNING *', [content, userId, postId])
    .then((result) => {
      const newComment = result.rows[0];
      res.status(201).json(newComment);
    })
    .catch((error) => {
      console.error('Error creating comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// Retrieve all comments for a post
exports.getAllCommentsForPost = (req, res) => {
  const { postId } = req.params;

  db.query('SELECT * FROM comments WHERE post_id = $1', [postId])
    .then((result) => {
      res.json(result.rows);
    })
    .catch((error) => {
      console.error('Error getting comments:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};
