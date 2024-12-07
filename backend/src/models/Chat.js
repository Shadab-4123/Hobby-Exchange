// models/Chat.js
const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: { 
        type: String, 
        required: true,
        trim: true,
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt
});

module.exports = mongoose.model('Chat', ChatSchema);
