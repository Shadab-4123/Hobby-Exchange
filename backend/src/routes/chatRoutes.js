// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const { getMessages, sendMessage } = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/groups/:groupId/messages
// @desc    Get all messages in a group
// @access  Private
router.get('/groups/:groupId/messages', authMiddleware, getMessages);

// @route   POST /api/groups/:groupId/messages
// @desc    Send a message to a group
// @access  Private
router.post('/groups/:groupId/messages', authMiddleware, sendMessage);

module.exports = router;
