import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

class TripsIndex extends React.Component {
  state = {
    trips: [],
    directors: []
  }

  componentWillMount() {
    console.log('inside will mount');
    Axios
      .get('/api/trips')
      .then(res => this.setState({ trips: res.data}))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          {Auth.isAuthenticated() && <Link to="/trips/new" className="main-button">
            <i className="fa fa-plus" aria-hidden="true"></i>Add Trip
          </Link>}
          {this.state.trips.map(trip => {
            return(
              <div key={trip.id} className="col-sm">
                <div className="col-sm">
                  <Link to={`/trips/${trip.id}`}>
                    <img src={trip.imageSRC} className="card-img-top" />
                    <p>{trip.name}</p>
                    <p>{trip.description}</p>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default TripsIndex;
