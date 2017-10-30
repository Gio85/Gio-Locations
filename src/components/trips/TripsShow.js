import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import GoogleMap from '../utility/GoogleMap';
import BackButton from '../utility/BackButton';

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

  deleteTrip = ({ id }) => {
    Axios
      .delete(`/api/trips/${id}`)
      .then(() => this.props.history.push('/'));
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
              console.log(post);
              return(
                <div key={post.id} >
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
          <button className="main-button" onClick={() => this.deleteTrip(this.state.trip)}>
            <i className="fa fa-trash" aria-hidden="true"></i>Delete
          </button>
        </div>
      </div>
    );
  }
}

export default TripsShow;
