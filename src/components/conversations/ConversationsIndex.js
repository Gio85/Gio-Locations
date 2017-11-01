import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';


class ConversationsIndex extends React.Component {
  state = {
    conversations: []
  }

  componentWillMount() {
    Axios
      .get('/api/conversations', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.setState({ conversations: res.data }, console.log(res.data)))

      .catch(err => {
        if(err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
      });
  }

  getUser = (conversation) => {
    const { userId } = Auth.getPayload();
    return conversation.from.id === userId ? conversation.to : conversation.from;
  }

  render() {
    return (
      <div className="row">
        {this.state.conversations && this.state.conversations.map(conversation => <div key={conversation.id}>
          <Link to={`/conversations/${conversation.id}`}>{this.getUser(conversation).username}</Link>
        </div>)}
      </div>
    );
  }
}

export default ConversationsIndex;
