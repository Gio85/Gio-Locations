const Post = require('../models/post');

function createRoute(req, res) {
  Post
    .create(req.body)
    .then(post => res.status(201).json(post))
    .catch(err => res.status(500).json(err));
}

function indexRoute(req, res) {
  Post
    .find()
    .populate('postedBy')// in order to show the username inside the posts Index page
    .exec()
    .then(posts => res.json(posts))
    .catch(err => res.status(500).json(err));
}

function showRoute(req, res) {
  Post
    .findById(req.params.id)
    .populate('postedBy')// in order to show the username inside the posts show page
    .exec()
    .then((post) => {
      if(!post) return res.notFound();

      res.json(post);
    })
    .catch(err => res.status(500).json(err));
}

function updateRoute(req, res) {

  if(req.file) req.body.image = req.file.filename;

  Post
    .findById(req.params.id)
    .exec()
    .then((post) => {
      if(!post) return res.notFound();

      post = Object.assign(post, req.body);
      return post.save();
    })
    .then((post) => res.json(post))
    .catch(err => res.status(500).json(err));
}

function deleteRoute(req, res) {
  Post
    .findById(req.params.id)
    .exec()
    .then((post) => {
      if(!post) return res.notFound();

      return post.remove();
    })
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json(err));
}

module.exports = {
  create: createRoute,
  index: indexRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
