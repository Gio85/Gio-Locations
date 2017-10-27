/* global api, describe, it, expect, beforeEach, afterEach */
require('../helper');

const Trip = require('../../../models/trip');
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

describe('GET /api/trips', () => {

  beforeEach(done => {
    Trip.create(tripData, done);
  });

  afterEach(done => {
    Trip.collection.remove();
    done();
  });
  it('should return 200 response', done => {
    api
      .get('/api/trips')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
  it('should return an array', done => {
    api
      .get('/api/trips')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
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
  it('should return an object', done => {
    api
      .get('/api/trips')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body[0]).to.be.an('object');
        done();
      });
  });
});
