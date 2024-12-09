// routes/groupRoutes.js
const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const postController = require('../controllers/postController'); // Import postController
const { getMessages, sendMessage } = require('../controllers/chatController');
const auth = require('../middleware/auth'); // Assuming you have authentication middleware
const { createEvent, getEvents, getEventDetails, updateEvent, deleteEvent, participateEvent } = require('../controllers/eventController');


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

// Chat Routes within Groups
// @route   GET /api/groups/:groupId/messages
// @desc    Get messages for a group
// @access  Private
router.get('/:groupId/messages', auth, getMessages);

// @route   POST /api/groups/:groupId/messages
// @desc    Send a message to a group
// @access  Private
router.post('/:groupId/messages', auth, sendMessage);

router.get('/:groupId/posts', auth, postController.getPosts);

// @route   POST /api/groups/:groupId/posts
// @desc    Create a new post in a group
// @access  Private (only members can create posts)
router.post('/:groupId/posts', auth, postController.createPost);

router.post('/:groupId/events', createEvent);



module.exports = router;
