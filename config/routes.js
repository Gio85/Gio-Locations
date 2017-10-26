const router = require('express').Router();
const posts = require('../controllers/posts');
const users = require('../controllers/users');
const auth = require('../controllers/auth');
const oauth = require('../controllers/oauth');
const secureRoute = require('../lib/secureRoute');
// const messages = require('../controllers/messages');
// const imageUpload = require('../lib/imageUpload');

router.route('/posts')
  .get(posts.index)
  .post(posts.create);

router.route('/posts/:id')
  .get(posts.show)
  .put(secureRoute, posts.update)
  .delete(secureRoute, posts.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/oauth/facebook')
  .post(oauth.facebook);

router.route('/users/:userId')
  .get(secureRoute, users.show);


router.all('/*', (req, res) => res.notFound());

module.exports = router;
