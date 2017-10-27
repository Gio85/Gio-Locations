/* global api, describe, it, expect, before, after, afterEach */
require('../helper');

const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');
const Food = require('../../../models/trip');
const User = require('../../../models/user');

const tripData = [{
  description: 'Mongolian Beef',
  name: 'beef.jpg',
  posts: {
    place: 'Spaghetti Carbonara',
    body: 'spaghetti.jpg',
    image: 'Dinner',
    locations: [{
      location: {
        lat: 20,
        lg: 30
      },
      name: 'naples',
      cost: 300
    }]
  }
}];

describe('POST /api/trips', () => {
  let token = null;

  before(done => {
    User.create({
      username: 'test',
      email: 'test@test.com',
      password: 'test',
      passwordConfirmation: 'test'
    }, (err, user) => {
      token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1hr' });
      done(err);
    });
  });

  after(done => {
    User.remove(done);
  });

  afterEach(done => {
    Food.remove(done);
  });

  // it('should return a 401 response', done => {
  //   api
  //     .post('/api/trips')
  //     .set('Accept', 'application/json')
  //     .send(tripData[0])
  //     .expect(401, done);
  // });

  it('should return a 201 response with a token', done => {
    api
      .post('/api/trips')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(tripData[0])
      .expect(201, done);
  });

  it('should return an object', done => {
    api
      .post('/api/trips')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(tripData[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .get('/api/trips')
      .set('Accept', 'application/json')
      .end((err, res) => {
        const tripItem = res.body[0];
        expect(tripItem.id).to.be.a('string');
        expect(tripItem.description).to.equal(tripData[0].description);
        expect(tripItem.name).to.equal(tripData[0].name);
        done();
      });
  });

});
