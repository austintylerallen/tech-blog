const db = require('../db/db');
const { Post, Comment } = require('../models');

// Controller function to create a new post
exports.createPost = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.session.user_id;

    if (!title || !content || !userId) {
        return res.status(400).json({ error: 'Title, content, and user ID are required' });
    }

    try {
        const newPost = await Post.create({ title, content, user_id: userId });
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller function to retrieve all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [Comment]
        });
        res.json(posts);
    } catch (error) {
        console.error('Error getting posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller function to retrieve a single post by ID
exports.getPostById = async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await Post.findByPk(postId, {
            include: [Comment]
        });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        console.error('Error getting post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller function to update a post
exports.updatePost = async (req, res) => {
    const { postId } = req.params;
    const { title, content } = req.body;

    try {
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        post.title = title;
        post.content = content;
        await post.save();

        res.json(post);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller function to delete a post
exports.deletePost = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        await post.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Controller function to create a new comment for a post
exports.createComment = async (req, res) => {
    const { comment_text } = req.body;
    const userId = req.session.user_id;
    const postId = req.params.postId;

    if (!comment_text || !userId) {
        return res.status(400).json({ error: 'Content and user ID are required' });
    }

    try {
        const newComment = await Comment.create({ comment_text, user_id: userId, post_id: postId });
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Controller function to retrieve all comments for a post
exports.getAllComments = async (req, res) => {
    const postId = req.params.postId;

    try {
        const comments = await Comment.findAll({ where: { post_id: postId } });
        res.json(comments);
    } catch (error) {
        console.error('Error getting comments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
