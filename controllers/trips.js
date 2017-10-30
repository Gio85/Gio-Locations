const Trip = require('../models/trip');

function createRoute(req, res, next) {

  if(req.file) req.body.image = req.file.filename;

  Trip
    .create(req.body)
    .then(trip => res.status(201).json(trip))
    .catch(next);
}

function indexRoute(req, res, next) {
  Trip
    .find()
    .populate('createdBy')// in order to show the username inside the trips Index page
    .exec()
    .then(trips => res.json(trips))
    .catch(next);
}

function showRoute(req, res, next) {
  Trip
    .findById(req.params.id)
    .populate('createdBy')// in order to show the username inside the trips show page
    .exec()
    .then((trip) => {
      if(!trip) return res.notFound();

      res.json(trip);
    })
    .catch(next);
}

function updateRoute(req, res, next) {

  if(req.file) req.body.image = req.file.filename;

  Trip
    .findById(req.params.id)
    .exec()
    .then((trip) => {
      if(!trip) return res.notFound();

      trip = Object.assign(trip, req.body);
      return trip.save();
    })
    .then((trip) => res.json(trip))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Trip
    .findById(req.params.id)
    .exec()
    .then((trip) => {
      if(!trip) return res.notFound();

      return trip.remove();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
}

function tripsPostsCreate(req, res, next) {
  if(req.file) req.body.image = req.file.filename;
  req.body.user = req.currentUser;
  Trip
    .findById(req.params.id)
    .exec()
    .then(trip => {
      trip.posts.push(req.body); // saved the new post into the array
      return trip.save();
    })
    .then(trip => res.json(trip))
    .catch(next);
}

function tripsPostsDelete(req, res, next) {
  Trip
    .findById(req.params.id)
    .exec()
    .then(trip => {
      const post = trip.posts.id(req.params.postId);
      post.remove();
      return trip.save();
    })
    .then(trip => res.json(trip))
    .catch(next);
}

module.exports = {
  create: createRoute,
  index: indexRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  postsCreate: tripsPostsCreate,
  postsDelete: tripsPostsDelete
};
