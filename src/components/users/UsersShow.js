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
      <div className="container">
        <div className="row box box-flex">
          <div className="col-md-3">
            <h1>{this.state.user.username}</h1>
            <img className="avatar" src={this.state.user.imageSRC} />
            {this.state.user.homeLocation && <p><i className="fa fa-map-marker" aria-hidden="true"></i>{this.state.user.homeLocation}</p>}
            {Auth.isAuthenticated() && this.props.match.params.userId !== Auth.getPayload().userId &&
            <button
              onClick={this.createConversation}
              className="btn btn-outline-primary">Message
            </button>
            }
          </div>
          <div className="col-md-9">
            <div className="box-flex">
              <BackButton history={this.props.history} />
              <h3>Trips</h3>
            </div>
            {this.state.user && this.state.user.trips.length < 1 &&
            <small>You did not share any trip yet.</small>}
            {this.state.user && this.state.user.trips.map((trip) => {
              return (
                <div key={trip.id} className="card-userPage">
                  <Link to={`/trips/${trip.id}`}>
                    <div className="profile-img" style={{backgroundImage: `url(${trip.imageSRC})`}}>
                      <p>{trip.name}</p>
                    </div>
                  </Link>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    );
  }
}

export default UsersShow;
