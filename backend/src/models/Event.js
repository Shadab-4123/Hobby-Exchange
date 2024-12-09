// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
