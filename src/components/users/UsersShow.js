import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import BackButton from '../utility/BackButton';

class UsersShow extends React.Component {

  state= {
    user: {}
  }

  componentDidMount() {
    Axios
      .get(`/api/users/${this.props.match.params.userId}`)
      .then(res => this.setState({ user: res.data }, console.log(res.data)))
      .catch(err => console.log(err));
  }

  createConversation = () => {
    Axios
      .post('/api/conversations', { createdBy: this.props.match.params.userId }, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.props.history.push(`/conversations/${res.data.id}`))
      .catch(err => console.log(err));
  }



  render() {
    console.log(this.props);

    return(
      <div className="row">
        <div className="page-banner col-md-12">
          <BackButton history={this.props.history} />
        </div>
        <div className="col-md-6">
          <h1>{this.state.user.username}</h1>
          {Auth.isAuthenticated() && this.props.match.params.userId !== Auth.getPayload().userId &&
            <button
              onClick={this.createConversation}
              className="btn btn-outline-primary">Message
            </button>
          }
        </div>
      </div>
    );
  }
}

export default UsersShow;
