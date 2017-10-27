import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import BackButton from '../utility/BackButton';

class TripsShow extends React.Component {
  state = {
    trip: {}
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
    return (
      <div className="row">
        <div className="page-banner col-md-12">
          <BackButton history={this.props.history} />
        </div>
        <div className="image-tile col-md-6">
          <img src={this.state.trip.image} className="img-responsive" />
        </div>
        <div className="col-md-6">
          <h3>{this.state.trip.name}</h3>
          <h4>{this.state.trip.description}</h4>
          <button className="standard-button">
            <Link to={`/trips/${this.state.trip.id}/edit`}>
              <i className="fa fa-pencil" aria-hidden="true"></i>Edit
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
