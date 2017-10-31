import React from 'react';
import Axios from 'axios';

import Auth from '../../lib/Auth';

class ConversationsShow extends React.Component {

  state = {
    conversation: {},
    errors: {}
  }

  componentDidMount() {
    Axios
      .get(`/api/conversations/${this.props.match.params.id}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.setState({ conversation: res.data }))
      .catch(err => console.log(err));
  }

  // createMessages = () => {
  //   Axios
  //     .post('/api/messages')
  // }

  render() {
    return(
      <div>
        <h1>{this.state.conversation.id}</h1>
      </div>
    );
  }
}

export default ConversationsShow;
