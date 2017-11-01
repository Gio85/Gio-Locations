import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import BackButton from '../utility/BackButton';

class UsersShow extends React.Component {

  state= {
    conversations: []
  }

  createConversation = () => {
    Axios
      .post('/api/conversations', { createdBy: this.state.trip.createdBy.id }, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.props.history.push(`/conversations/${res.data.id}`))
      .catch(err => console.log(err));
  }

  render() {

    return(
      <div className="row">
        <div className="page-banner col-md-12">
          <BackButton history={this.props.history} />
        </div>
        <div className="col-md-6">
          <h1>User Page Profile</h1>
          {Auth.isAuthenticated() && this.isOwner() &&
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
