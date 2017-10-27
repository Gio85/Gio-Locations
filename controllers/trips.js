const Trip = require('../models/trip');

function createRoute(req, res) {

  if(req.file) req.body.image = req.file.filename;

  Trip
    .create(req.body)
    .then(trip => res.status(201).json(trip))
    .catch(err => res.status(500).json(err));
}

function indexRoute(req, res) {
  Trip
    .find()
    .populate('createdBy')// in order to show the username inside the trips Index page
    .exec()
    .then(trips => res.json(trips))
    .catch(err => res.status(500).json(err));
}

function showRoute(req, res) {
  Trip
    .findById(req.params.id)
    .populate('createdBy')// in order to show the username inside the trips show page
    .exec()
    .then((trip) => {
      if(!trip) return res.notFound();

      res.json(trip);
    })
    .catch(err => res.status(500).json(err));
}

function updateRoute(req, res) {

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
    .catch(err => res.status(500).json(err));
}

function deleteRoute(req, res) {
  Trip
    .findById(req.params.id)
    .exec()
    .then((trip) => {
      if(!trip) return res.notFound();

      return trip.remove();
    })
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json(err));
}

function tripsPostsCreate(req, res) {
  req.body.user = req.currentUser;
  Trip
    .findById(req.params.id)
    .exec()
    .then(trip => {
      trip.posts.push(req.body); // saved the new post into the array
      return trip.save();
    })
    .then(trip => res.redirect(`/trips/${trip.id}`))
    .catch(err => res.render('error', { err }));
}

function tripsPostsDelete(req, res) {
  Trip
    .findById(req.params.id)
    .exec()
    .then(trip => {
      const post = trip.posts.id(req.params.postId);
      post.remove();
      return trip.save();
    })
    .then(trip => res.redirect(`/trips/${trip.id}`))
    .catch(err => res.render('error', { err }));
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
