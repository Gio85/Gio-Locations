import React from 'react';
import BackButton from '../utility/BackButton';

class UsersShow extends React.Component {
  render() {
    return(
      <div className="row">
        <div className="page-banner col-md-12">
          <BackButton history={this.props.history} />
        </div>
        <div className="col-md-6">
          <h1>User Page Profile</h1>
        </div>
      </div>
    );
  }
}

export default UsersShow;
