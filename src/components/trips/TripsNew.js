import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';

import TripsForm from './TripsForm';

class TripsNew extends React.Component {
  state = {
    trip: {
      location: '',
      description: '',
      test: {}
    },
    errors: {}
  };

  getAutocompleteInfo = (place) => {
    this.setState({ test: { location: place.geometry.location.toJSON(), name: place.name, address: place.formatted_address }}, () => console.log(this.state));
  }

  handleChange = ({ target: { name, value } }) => {
    const trip = Object.assign({}, this.state.trip, { [name]: value });
    this.setState({ trip });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post('/api/trips', this.state.trip, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(() => this.props.history.push('/'))
      .catch(err =>this.setState({ errors: err.response.data.errors}, () => console.log(this.state)));
  }

  render() {
    return (
      <TripsForm
        history={this.props.history}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        trip={this.state.trip}
        errors={this.state.errors}
        getAutocompleteInfo={this.getAutocompleteInfo}
      />
    );
  }
}

export default TripsNew;
