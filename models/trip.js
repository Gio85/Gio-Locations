const mongoose = require('mongoose');
const postSchema = require('./post');

const tripSchema = new mongoose.Schema({
  description: { type: String, required: true },
  name: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  posts: [ postSchema ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Trip', tripSchema);
