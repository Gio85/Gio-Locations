// const mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');
// const { dbURI } = require('../config/environment');
// const Trip = require('../models/trip');
// // const User = require('../models/user');
// //
// // const tripData = [{
// //   place: 'Naples',
// //   body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
// //   dataTime: '',
// //   image: 'https://cache-graphicslib.viator.com/graphicslib/destination/naples-398598.jpg',
// //   locations: {
// //     location: '',
// //     name: 'Napoli, Via Duomo',
// //     cost: 2000
// //   }
// // }];
//
// mongoose.connect(dbURI, { useMongoClient: true })
//   .then(db => db.dropDatabase())
//   .then(() => Trip.create(tripData))
//   .then(pets => console.log(`${pets.length} trip created`))
//   .catch(err => console.log(err))
//   .finally(() => mongoose.connection.close());
