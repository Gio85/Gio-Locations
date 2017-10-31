const router = require('express').Router();
const trips = require('../controllers/trips');
const users = require('../controllers/users');
const auth = require('../controllers/auth');
const oauth = require('../controllers/oauth');
const secureRoute = require('../lib/secureRoute');
const conversations = require('../controllers/conversations');
const imageUpload = require('../lib/imageUpload');


router.route('/trips')
  .get(trips.index)
  .post(imageUpload, secureRoute, trips.create);

router.route('/trips/:id')
  .get(trips.show)
  .put(secureRoute)
  .delete(secureRoute, trips.delete);

router.post('/trips/:id/posts', imageUpload, trips.postsCreate);

router.route('/trips/:id/posts/:postId')
  .get(trips.postsShow)
  .put(secureRoute, trips.postsUpdate)
  .delete(secureRoute, trips.postsDelete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/oauth/facebook')
  .post(oauth.facebook);

router.route('/users/:userId')
  .get(secureRoute, users.show);

router.route('/conversations')
  .get(secureRoute, conversations.conversationsIndex)
  .post(secureRoute, conversations.conversationsCreate);

router.route('/conversations/:id')
  .get(secureRoute, conversations.conversationsShow);

router.route('/conversations/:id/messages')
  .post(secureRoute, conversations.messagesCreate);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
