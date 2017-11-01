import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import BackButton from '../utility/BackButton';
import { Link } from 'react-router-dom';

class UsersShow extends React.Component {

  state= {
    user: ''
  }

  componentDidMount() {
    Axios
      .get(`/api/users/${this.props.match.params.userId}`)
      .then(res => this.setState({ user: res.data }, console.log('DID-MOUNT', res.data)))
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
    return(
      <div className="row">
        <div className="col-md-12">
          <h1>{this.state.user.username}</h1>
          <img src={this.state.user.imageSRC} />
          {Auth.isAuthenticated() && this.props.match.params.userId !== Auth.getPayload().userId &&
            <button
              onClick={this.createConversation}
              className="btn btn-outline-primary">Message
            </button>
          }
          <h3>Trips</h3>
          {this.state.user && this.state.user.trips.map((trip) => {
            return (
              <div key={trip.id} className="card">
                <img src={trip.imageSRC} />
                <Link to={`/trips/${trip.id}`}><p>{trip.name}</p></Link>
              </div>
            );
          })}
        </div>
        <div className="page-banner col-md-12">
          <BackButton history={this.props.history} />
        </div>
      </div>
    );
  }
}

export default UsersShow;
