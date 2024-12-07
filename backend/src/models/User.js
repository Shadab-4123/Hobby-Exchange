// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Remove 'id' as MongoDB automatically creates '_id'
  username: { type: String, required: true },
  email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true 
  },
  password: { type: String, required: true },
  groupsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }], // Use ObjectId
  createdAt: { type: Date, default: Date.now },
  // avatar: { type: String }, // Optional: URL to profile picture
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Optional: Create a virtual 'id' field to mirror '_id'
userSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id; }
});

module.exports = mongoose.model('User', userSchema);
