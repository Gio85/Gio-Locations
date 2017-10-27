const router = require('express').Router();
const trips = require('../controllers/trips');
const users = require('../controllers/users');
const auth = require('../controllers/auth');
const oauth = require('../controllers/oauth');
const secureRoute = require('../lib/secureRoute');
const conversations = require('../controllers/conversations');


router.route('/trips')
  .get(trips.index)
  .post(trips.create);

router.route('/trips/:id')
  .get(trips.show)
  .put(secureRoute, trips.update)
  .delete(secureRoute, trips.delete);

router.post('/trips/:id/posts', trips.postsCreate);
router.delete('/movies/:id/posts/:postId', secureRoute, trips.postsDelete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/oauth/facebook')
  .post(oauth.facebook);

router.route('/users/:userId')
  .get(secureRoute, users.show);

router.route('/conversations')
  .get(secureRoute, conversations.conversationsIndex);

router.route('/conversations/:id')
  .get(secureRoute, conversations.conversationsShow);
// .delete(conversations.conversationsDelete);

router.route('/messages')
  .post(secureRoute, conversations.messagesCreate);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
