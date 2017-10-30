const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  name: { type: String },
  address: { type: String },
  cost: { type: Number }
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  date: { type: Date },
  image: { type: String },
  locations: [ locationSchema ]
}, {
  timestamps: true
});

const tripSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String, required: true },
  image: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  posts: [ postSchema ]
}, {
  timestamps: true
});

tripSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return null;
    if(this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.image}`;
  });

module.exports = mongoose.model('Trip', tripSchema);
