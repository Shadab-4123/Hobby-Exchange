// routes/groupRoutes.js
const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const postController = require('../controllers/postController'); // Import postController
const auth = require('../middleware/authMiddleware'); // Assuming you have authentication middleware

// Group Routes
// @route   POST /api/groups
// @desc    Create a new group
// @access  Private
router.post('/', auth, groupController.createGroup);

// @route   GET /api/groups
// @desc    Get all groups or search by category/name
// @access  Public
router.get('/', groupController.getAllGroups);

// @route   GET /api/groups/:groupId
// @desc    Get group details
// @access  Public
router.get('/:groupId', groupController.getGroupDetails);

// @route   POST /api/groups/:groupId/join
// @desc    Join a group
// @access  Private
router.post('/:groupId/join', auth, groupController.joinGroup);

// @route   POST /api/groups/:groupId/leave
// @desc    Leave a group
// @access  Private
router.post('/:groupId/leave', auth, groupController.leaveGroup);

// Posts Routes within Groups
// @route   GET /api/groups/:groupId/posts
// @desc    Get all posts in a group
// @access  Private (assuming only members can view posts)
router.get('/:groupId/posts', auth, postController.getPosts);

// @route   POST /api/groups/:groupId/posts
// @desc    Create a new post in a group
// @access  Private (only members can create posts)
router.post('/:groupId/posts', auth, postController.createPost);

module.exports = router;
