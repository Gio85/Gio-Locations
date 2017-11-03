import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import ConversationsShow from './ConversationsShow';


class ConversationsIndex extends React.Component {
  state = {
    conversations: [],
    selectedConversation: {}
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

  selectConversation = (selectedConversation) => this.setState({ selectedConversation });

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            {this.state.conversations && this.state.conversations.map(conversation => <div className="single-conversation" key={conversation.id} onClick={() => this.selectConversation(conversation)}>
              <p>{this.getUser(conversation).username}</p>
            </div>)}
          </div>
          <div className="col-md-10">
            {this.state.conversations.length < 1 &&
            <small>You do not have any conversatione with anyone. Start to talk to someone, do not be scared.</small>}
            {this.state.conversations.length > 0 &&
              <ConversationsShow conversation={this.state.selectedConversation}/>}
          </div>
        </div>
      </div>
    );
  }
}

export default ConversationsIndex;
