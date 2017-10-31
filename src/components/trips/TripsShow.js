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
      .then(res => this.setState({ trip: res.data }))
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

  render() {
    console.log('inside tripsShow component', this.state);
    return (
      <div className="row">
        <div className="page-banner col-md-12">
          <BackButton history={this.props.history} />
        </div>
        <div className="image-tile col-md-6">
          <img src={this.state.trip.imageSRC} className="img-responsive"/>
        </div>
        <div className="col-md-6">
          <h2>{this.state.trip.name}</h2>
          {this.state.trip.posts &&
            this.state.trip.posts.map((post) => {
              return(
                <div key={post.id} >
                  <p>{post.title}</p>
                  <p>{post.body}</p>
                  <p>{post.date}</p>
                  <img src={post.imageSRC} className="col-md-6" />
                  {post.locations.map((location) => {
                    return (
                      <div key={location.id} >
                        <p>{location.name}</p>
                        <p>£ {location.cost}</p>
                        <GoogleMap center={{ lat: location.location.lat, lng: location.location.lng }}/>
                      </div>
                    );
                  })}
                  <button className="standard-button">
                    <Link to={`/trips/${this.state.trip.id}/posts/${post.id}/edit`}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>Edit the post
                    </Link>
                  </button>
                  <button onClick={() => this.deleteTripPost(post.id)}>Delete</button>
                </div>
              );
            })

          }
          <button className="standard-button">
            <Link to={`/trips/${this.state.trip.id}/edit`}>
              <i className="fa fa-pencil" aria-hidden="true"></i>Edit
            </Link>
          </button>
          <button className="standard-button">
            <Link to={`/trips/${this.state.trip.id}/posts`}>
              <i className="fa fa-pencil" aria-hidden="true"></i>Add Post
            </Link>
          </button>
          <button onClick={this.createConversation} className="standard-button">Message</button>
          {Auth.isAuthenticated() && <button className="main-button" onClick={this.deleteTrip}>
            <i className="fa fa-trash" aria-hidden="true"></i>Delete
          </button>}
        </div>
      </div>
    );
  }
}

export default withRouter(TripsShow);
