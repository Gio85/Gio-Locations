import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';

import TripsForm from './TripsForm';

class TripsNew extends React.Component {
  state = {
    trip: {
      name: '',
      description: '',
      createdBy: ''
    },
    errors: {}
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
      />
    );
  }
}

export default TripsNew;
