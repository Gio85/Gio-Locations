const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  name: { type: String },
  cost: { type: Number }
});

const postSchema = new mongoose.Schema({
  place: { type: String, required: true },
  body: { type: String, required: true },
  dataTime: { type: Date },
  image: { type: String },
  locations: [{ locationSchema }]
}, {
  timestamps: true
});

const tripSchema = new mongoose.Schema({
  description: { type: String, required: true },
  name: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  posts: [ postSchema ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Trip', tripSchema);
