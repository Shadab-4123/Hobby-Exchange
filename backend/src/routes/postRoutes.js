// routes/postRoutes.js
const express = require('express');
const router = express.Router({ mergeParams: true }); // Important to merge params from parent
const postController = require('../controllers/postController'); // Correct path
const auth = require('../middleware/authMiddleware'); // Authentication middleware

// @route   GET /api/groups/:groupId/posts
// @desc    Get all posts in a group
// @access  Private
router.get('/', auth, postController.getPosts);

// @route   POST /api/groups/:groupId/posts
// @desc    Create a new post in a group
// @access  Private
router.post('/', auth, postController.createPost);

module.exports = router;
