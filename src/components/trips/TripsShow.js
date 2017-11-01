import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Axios from 'axios';
import GoogleMap from '../utility/GoogleMap';
import BackButton from '../utility/BackButton';
import Auth from '../../lib/Auth';
import Moment from 'react-moment';

class TripsShow extends React.Component {
  state = {
    trip: {},
    errors: {},
    selectedLocation: {}
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

  highlightMarker = (selectedLocation) => this.setState({ selectedLocation });

  render() {
    const styles = {
      backgroundImage: `url(${this.state.trip.imageSRC})`
    };

    return (
      <div className="box">
        <div className="row">
          <div className="col-md-12">
            <BackButton history={this.props.history} />
          </div>
          <div className="col-md-12">
            <div className="trip-banner-image" style={styles}>
              <h1>{this.state.trip.name}</h1>
              <h2>{this.state.trip.description}</h2>
              {this.state.trip.createdBy && <h3>
              Created by: <Link to={`/users/${this.state.trip.createdBy.id}`}>{this.state.trip.createdBy.username}</Link></h3>}
            </div>
          </div>
          <div className="image-tile col-md-6">
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
          </div>
        </div>
        <div className="row">
          {this.state.trip.posts &&
              this.state.trip.posts.map((post) => {
                return(
                  <div className="col-md-12 post-container" key={post.id}>
                    <div className="row">
                      <div className="col-md-6">
                        <img src={post.imageSRC} />
                      </div>
                      <div className="col-md-6">
                        <h3>{post.title}</h3>
                        <Moment format="MMMM Do YYYY">{post.date}</Moment>
                        <p>{post.body}</p>
                      </div>
                      <div className="col-md-6 trip-locations">
                        {post.locations.map((location) => {
                          return (
                            <div key={location.id} className="trip-location" onClick={() => this.highlightMarker(location)}>
                              <div>
                                <h2>{location.name}</h2>
                                <p>{location.address}</p>
                              </div>
                              <h3>£{location.cost}</h3>
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
                      </div>
                      <div className="col-md-6 trip-locations-map">
                        {this.state.trip.posts && <GoogleMap post={post} selectedLocation={this.state.selectedLocation}/>}
                      </div>
                    </div>
                  </div>
                );
              })
          }
        </div>
      </div>
    );
  }
}

export default withRouter(TripsShow);
