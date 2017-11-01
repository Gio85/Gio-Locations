import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Axios from 'axios';
import GoogleMap from '../utility/GoogleMap';
import BackButton from '../utility/BackButton';
import Auth from '../../lib/Auth';

class TripsShow extends React.Component {
  state = {
    trip: {},
    errors: {}
  }

  componentWillMount() {

    Axios
      .get(`/api/trips/${this.props.match.params.id}`)
      .then(res => this.setState({ trip: res.data }, console.log(res.data)))
      .catch(err => console.log(err));
  }


  deleteTrip = () => {
    Axios
      .delete(`/api/trips/${this.props.match.params.id}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(() => this.props.history.push('/'));
  }


  deleteTripPost = id => {
    Axios
      .delete(`/api/trips/${this.props.match.params.id}/posts/${id}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(() => this.props.history.push('/'));
  }

  createConversation = () => {
    Axios
      .post('/api/conversations', { createdBy: this.state.trip.createdBy.id }, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.props.history.push(`/conversations/${res.data.id}`))
      .catch(err => console.log(err));
  }

  isOwner =() => {
    return this.state.trip.createdBy && this.state.trip.createdBy.id !== Auth.getPayload().userId;
  }
  isCreatedBy =() => {
    return this.state.trip.createdBy && this.state.trip.createdBy.id === Auth.getPayload().userId;
  }

  render() {
    return (
      <div className="row">
        <div className="page-banner col-md-12">
          <BackButton history={this.props.history} />
        </div>
        <div className="image-tile col-md-6">
          {this.state.trip.createdBy && <h3>
          Created by:<Link to={`/users/${this.state.trip.createdBy.id}`}> {this.state.trip.createdBy.username}</Link></h3>}
          {Auth.isAuthenticated() && this.isOwner() &&
            <button
              onClick={this.createConversation}
              className="btn btn-outline-primary">Message
            </button>
          }
          <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
            {Auth.isAuthenticated() && this.isCreatedBy() &&
          <button className="btn btn-outline-primary">
            <Link to={`/trips/${this.state.trip.id}/posts`}>
              <i className="fa fa-pencil" aria-hidden="true"></i> Add a new post
            </Link>
          </button>}
            {Auth.isAuthenticated() && this.isCreatedBy() &&
            <button
              className="btn btn-outline-danger"
              onClick={this.deleteTrip}>
              <i className="fa fa-trash" aria-hidden="true"></i> Delete
            </button>
            }
          </div>
          <h2>{this.state.trip.name}</h2>
          <img src={this.state.trip.imageSRC} className="img-fluid"/>
        </div>
        {this.state.trip.posts &&
            this.state.trip.posts.map((post) => {
              return(
                <ul key={post.id} className="list-unstyled">
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                  <p>{post.date}</p>
                  <img src={post.imageSRC} className="col-md-6" />
                  {post.locations.map((location) => {
                    return (
                      <div key={location.id} >
                        <h2>{location.name}</h2>
                        <h3>£ {location.cost}</h3>
                        <GoogleMap center={{ lat: location.location.lat, lng: location.location.lng }}/>
                      </div>
                    );
                  })}
                  {Auth.isAuthenticated() && this.isCreatedBy() &&
                  <button className="standard-button">
                    <Link to={`/trips/${this.state.trip.id}/posts/${post.id}/edit`}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>Edit the post
                    </Link>
                  </button>}
                  {Auth.isAuthenticated() && this.isCreatedBy() &&
                  <button onClick={() => this.deleteTripPost(post.id)}>Delete</button>}
                </ul>
              );
            })
        }
      </div>
    );
  }
}

export default withRouter(TripsShow);
