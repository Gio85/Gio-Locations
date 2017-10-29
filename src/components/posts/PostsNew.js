import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';

import PostsForm from './PostsForm';

class PostsNew extends React.Component {
  state = {
    post: {
      title: '',
      body: '',
      date: '',
      image: '',
      locations: {
        name: '',
        address: '',
        cost: '',
        location: {
          lat: '',
          lng: ''
        }
      }
    },
    errors: {}
  }

  getAutocompleteInfo = (place) => {
    this.setState({ locations: { location: place.geometry.location.toJSON(), name: place.name, address: place.formatted_address }}, () => console.log(this.state));
  }

  handleChange = ({ target: { name, value } }) => {
    const post = Object.assign({}, this.state.post, { [name]: value });
    this.setState({ post });
  }


  handleSubmit = (e) =>{
    e.preventDefault();

    Axios
      .post('/api/trips/:id/posts', this.state.post, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({ errors: err.response.data.errors}, () => console.log(this.state)));
  }

  render() {
    return (
      <PostsForm
        history={this.props.history}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        post={this.state.post}
        errors={this.state.errors}
        getAutocompleteInfo={this.getAutocompleteInfo}
      />
    );
  }

}

export default PostsNew;
