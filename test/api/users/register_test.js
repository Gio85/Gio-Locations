/* global api, describe, it, expect, afterEach */
require('../helper');

const User = require('../../../models/user');

const userToCreate = {
  username: 'test',
  email: 'email.test@test.com',
  password: 'test',
  passwordConfirmation: 'test'
};

describe('POST /api/register', () => {

  afterEach(done => {

    User.collection.remove();
    done();
  });

  it('should return 200 response', done => {
    api
      .post('/api/register')
      .set('Accept', 'application/json')
      .send(userToCreate)
      .expect(200, done);
  });

  it('should return 201 response with a message', done => {
    api
      .post('/api/register')
      .set('Accept', 'application/json')
      .send(userToCreate)
      .end((err, res) => {
        expect(res.body.message).to.equal('Registration successful');
        done();
      });
  });

  it('should return an object', done => {
    api
      .post('/api/register')
      .set('Accept', 'application/json')
      .send(userToCreate)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should successfully add the user to the database', done => {
    api
      .post('/api/register')
      .set('Accept', 'application/json')
      .send(userToCreate)
      .end((err) => {
        User
          .find()
          .exec()
          .then(res => {
            expect(res).to.not.be.null;
          });
        done(err);
      });
  });
});
