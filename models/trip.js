const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  description: { type: String, required: true },
  name: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  post: { type: mongoose.Schema.ObjectId, ref: 'Post' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Trip', tripSchema);
