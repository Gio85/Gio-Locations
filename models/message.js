const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  from: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  to: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  image: {type: String },
  trip: { type: mongoose.Schema.ObjectId, ref: 'Trip', required: true },
  read: { type: Boolean }
}, {
  timestamps: true
});


module.exports = mongoose.model('Message', messageSchema);
