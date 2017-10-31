const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ['gif', 'text'] },
  from: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  read: { type: Boolean }
}, {
  timestamps: true
});


const conversationSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  to: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  messages: [ messageSchema ]
}, {
  timestamps: true
});


module.exports = mongoose.model('Conversation', conversationSchema);

// CONVERSATION
// to
// from
// trip
// messages [ messageSchema ]

// MESSAGE
// from
// text
// read

// /messages POST
// /conversations/:id/messages/:messageId DELETE
