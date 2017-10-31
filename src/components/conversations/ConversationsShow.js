import React from 'react';
import Axios from 'axios';

import ConversationsForm from './ConversationsForm';
import Auth from '../../lib/Auth';

class ConversationsShow extends React.Component {

  state = {
    conversation: null,
    message: '',
    errors: {}
  }

  componentDidMount() {
    Axios
      .get(`/api/conversations/${this.props.match.params.id}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.setState({ conversation: res.data }, () => console.log(this.state)))
      .catch(err => console.log(err));
  }

  stickyScroll() {
    console.log(this.state);
    const objDiv = document.getElementsByClassName('conversation')[0];
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  handleChange = ({ target: { value }}) => {
    this.setState({ message: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`/api/conversations/${this.props.match.params.id}/messages`, { text: this.state.message }, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ conversation: res.data }, this.stickyScroll))
      .catch(err => this.setState({ errors: err.response.data.errors }), console.log('inside handleSubmit-conversationsShow'));

  }

  render() {
    const { userId } = Auth.getPayload();
    const { conversation } = this.state;
    return (
      <div className="box white rounded">
        {conversation && <h1>{conversation.to.id === userId ? conversation.from.username : conversation.to.username}</h1>}
        <div className="conversation content container-fluid bootstrap snippets">
          <div className="row row-broken">
            <div className="col-sm-11 col-xs-12 chat">
              <div className="col-inside-lg decor-default">
                <div className="chat-body">
                  {conversation && conversation.messages.map(message =>
                    <div key={message.id} className={message.from.id === userId ? 'answer right' : 'answer left'}>
                      <div className="name">{message.from.username}</div>
                      <div className="text">{message.text}</div>
                      <div className="time">{message.createdAt.substr(11, 8)}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ConversationsForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
          message={this.state.message}
        />
      </div>
    );
  }
}

export default ConversationsShow;
