// models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: { 
        type: String, 
        required: true,
        trim: true, // Removes whitespace from both ends
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Post', PostSchema);
