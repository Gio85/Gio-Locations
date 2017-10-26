const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  place: { type: String, required: true },
  body: { type: String, required: true },
  dataTime: { type: Date },
  image: { type: String },
  locations: [{
    location: {
      lat: { type: Number },
      lng: { type: Number }
    },
    name: { type: String },
    cost: { type: Number }
  }],
  postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

module.exports = postSchema;
