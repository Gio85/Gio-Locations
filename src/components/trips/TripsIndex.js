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
                <div className="card">
                  <img src={trip.imageSRC} className="card-img-top" />
                  <div className="card-body">
                    <h4 className="card-title">{trip.name}</h4>
                    <p className="card-text">{trip.description}</p>
                    <Link to={`/trips/${trip.id}`}>
                      <button className="btn btn-primary">Read more...</button>
                    </Link>
                  </div>
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
