const router = require('express').Router();
const trips = require('../controllers/trips');
const users = require('../controllers/users');
const auth = require('../controllers/auth');
const oauth = require('../controllers/oauth');
const secureRoute = require('../lib/secureRoute');
// const messages = require('../controllers/messages');
// const imageUpload = require('../lib/imageUpload');

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


router.all('/*', (req, res) => res.notFound());

module.exports = router;
