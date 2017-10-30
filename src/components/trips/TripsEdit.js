import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';

import TripsForm from './TripsForm';

class TripsEdit extends React.Component {
  state = {
    trip: {
      title: '',
      body: '',
      date: '',
      image: '',
      locations: [{
        name: '',
        address: '',
        cost: '',
        location: {
          lat: '',
          lng: ''
        }
      }]
    },
    errors: {}
  }

  componentDidMount() {
    Axios
      .get(`/api/trips/${this.props.match.params.id}`)
      .then(res => this.setState({ trip: res.data }))
      .catch(err => console.log(err));
  }

  handleChange = ({ target: { name, value } }) => {
    const trip = Object.assign({}, this.state.trip, { [name]: value });
    this.setState({ trip });
  }


}
