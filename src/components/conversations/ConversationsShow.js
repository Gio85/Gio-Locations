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
    if (this.props.match && this.props.match.params.id) {
      Axios
        .get(`/api/conversations/${this.props.match.params.id}`, {
          headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
        })
        .then(res => this.setState({ conversation: res.data }, this.stickyScroll))
        .catch(err => console.log(err));
    }
  }

  componentDidUpdate() {
    if(!this.props.conversation || !this.props.conversation.id) return false;
    if(this.state.conversation && (this.props.conversation.id === this.state.conversation.id)) return false;

    Axios
      .get(`/api/conversations/${this.props.conversation.id}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.setState({ conversation: res.data }, this.stickyScroll))
      .catch(err => console.log(err));
  }

  stickyScroll() {
    const objDiv = document.getElementsByClassName('box-conversation')[0];
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  handleChange = ({ target: { value }}) => {
    this.setState({ message: value });
  }

  handleSubmit = (e) => {
    console.log(this.state.conversation);
    e.preventDefault();
    Axios.post(`/api/conversations/${this.state.conversation.id}/messages`, { text: this.state.message }, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ conversation: res.data, message: '' }, this.stickyScroll))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    console.log(this.state);
    const { userId } = Auth.getPayload();
    const { conversation } = this.state;
    return (
      <div className={this.props.index ? '' : 'container'}>
        <div className="box-messages">
          <div className="message-header">
            {conversation &&
              <h1>{conversation.to.id === userId ? conversation.from.username : conversation.to.username}</h1>}
          </div>
          <div className="row row-broken">
            <div className="col-md-12">
              <div className="col-inside-lg">
                <div className="box-conversation">
                  {conversation && conversation.messages.map(message =>
                    <div key={message.id} className={message.from.id === userId ? 'answer right' : 'answer left'}>
                      <div className="text">{message.text}</div>
                      <div className="time">{message.createdAt.substr(11, 8)}</div>
                    </div>
                  )}
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
      </div>
    );
  }
}

export default ConversationsShow;
