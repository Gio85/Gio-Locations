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
      <div>
        <div className="row">
          <div className="page-banner col-md-12">
            {Auth.isAuthenticated() && <Link to="/trips/new" className="main-button">
              <i className="fa fa-plus" aria-hidden="true"></i>Add Trip
            </Link>}
          </div>
          {this.state.trips.map(trip => {
            return(
              <div key={trip.id} className="image-tile col-md-4 col-sm-6 col-xs-12">
                <Link to={`/trips/${trip.id}`}>
                  <img src={trip.imageSRC} className="img-responsive" />
                  <p>{trip.name}</p>
                  <p>{trip.description}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default TripsIndex;
