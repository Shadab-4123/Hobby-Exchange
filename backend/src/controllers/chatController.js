// controllers/chatController.js
const mongoose = require('mongoose');
const Chat = require('../models/Chat'); // Ensure Chat model is defined
const Group = require('../models/Group');
const Pusher = require('pusher');

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true,
});

// Get all messages for a specific group
exports.getMessages = async (req, res) => {
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

        const messages = await Chat.find({ groupId })
            .populate('senderId', 'username')
            .sort({ timestamp: 1 });

        res.status(200).json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.sendMessage = async (req, res) => {
    const { groupId } = req.params;
    const { message } = req.body;

    if (!mongoose.Types.ObjectId.isValid(groupId)) {
        return res.status(400).json({ message: 'Invalid group ID' });
    }

    if (!message || message.trim() === '') {
        return res.status(400).json({ message: 'Message cannot be empty' });
    }

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (!group.members.includes(req.user._id)) {
            return res.status(403).json({ message: 'You are not a member of this group' });
        }

        const newMessage = new Chat({
            groupId,
            senderId: req.user._id,
            message,
        });

        await newMessage.save();

        pusher.trigger(`group-${groupId}`, 'new-message', {
            _id: newMessage._id,
            groupId: newMessage.groupId,
            senderId: {
                _id: req.user._id,
                username: req.user.username,
            },
            message: newMessage.message,
            timestamp: newMessage.timestamp,
        });

        res.status(201).json(newMessage);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
