// controllers/postController.js
const mongoose = require('mongoose');
const Post = require('../models/Post');
const Group = require('../models/Group');

// Get all posts for a specific group
exports.getPosts = async (req, res) => {
    const { groupId } = req.params;

    // Validate groupId
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
        return res.status(400).json({ message: 'Invalid group ID' });
    }

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        const posts = await Post.find({ groupId })
            .populate('authorId', 'username')
            .sort({ createdAt: -1 }); // Latest posts first

        res.status(200).json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new post in a specific group
exports.createPost = async (req, res) => {
    const { groupId } = req.params;
    const { content } = req.body;

    // Validate groupId
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
        return res.status(400).json({ message: 'Invalid group ID' });
    }

    if (!content || content.trim() === '') {
        return res.status(400).json({ message: 'Post content cannot be empty' });
    }

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Check if user is a member
        if (!group.members.includes(req.user._id)) {
            return res.status(403).json({ message: 'You are not a member of this group' });
        }

        const post = new Post({
            groupId,
            authorId: req.user._id,
            content,
        });

        await post.save();

        // Emit via Pusher (if used)
        const Pusher = require('pusher');
        const pusher = new Pusher({
            appId: process.env.PUSHER_APP_ID,
            key: process.env.PUSHER_KEY,
            secret: process.env.PUSHER_SECRET,
            cluster: process.env.PUSHER_CLUSTER,
            useTLS: true,
        });

        pusher.trigger(`group-${groupId}`, 'new-post', {
            _id: post._id,
            groupId: post.groupId,
            authorId: {
                _id: req.user._id,
                username: req.user.username,
            },
            content: post.content,
            createdAt: post.createdAt,
        });

        res.status(201).json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
