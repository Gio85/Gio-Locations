const User = require('../models/user');

function showRoute(req, res, next) {
  console.log('USER SHOW', req.params.userId);
  User
    .findById(req.params.userId)
    .populate('trips')
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      res.json(user);
    })
    .catch(next);
}

module.exports = {
  show: showRoute
};
