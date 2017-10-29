import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';

import PostsForm from './PostsForm';

class PostsNew extends React.Component {
  state = {
    data: {
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

  getAutocompleteInfo = (index, place) => {
    const { lat, lng } = place.geometry.location.toJSON();
    const { formatted_address: address, name } = place;

    this.setState(prevState => {
      const locations = prevState.data.locations.map((location, i) => {
        if(i === index) Object.assign(location, { location: { lat, lng }, address, name });
        return location;
      });

      const data = Object.assign({}, this.state.data, { locations });
      this.setState({ data });
    });
  }

  handleLocationChange = (index, key, value) => {
    const locations = this.state.data.locations.map((location, i) => {
      if(index === i) location[key] = value;
      return location;
    });

    const data = Object.assign({}, this.state.data, { locations });
    this.setState({ data });
  }

  // handle `normal` form inputs
  handleChange = ({ target: { name, value } }) => {
    const data = Object.assign({}, this.state.data, { [name]: value });
    this.setState({ data });
  }

  addLocation = () => {
    this.setState(prevState => {
      const locations = prevState.data.locations.concat({
        name: '',
        cost: '',
        location: { lat: '', lng: '' }
      });
      const data = Object.assign({}, this.state.data, { locations });
      return { data };
    });
  }


  handleSubmit = (e) =>{
    e.preventDefault();

    Axios
      .data('/api/trips/:id/datas', this.state.data, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(() => this.props.history.push('/trips/:id'))
      .catch(err => this.setState({ errors: err.response.data.errors}, () => console.log(this.state)));
  }

  render() {
    return (
      <PostsForm
        handleSumbit={this.handleSumbit}
        handleChange={this.handleChange}
        handleLocationChange={this.handleLocationChange}
        getAutocompleteInfo={this.getAutocompleteInfo}
        data={this.state.data}
        addLocation={this.addLocation}
      />
    );
  }

}

export default PostsNew;
