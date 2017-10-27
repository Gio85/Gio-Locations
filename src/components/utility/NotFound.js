import React from 'react';
import { Link } from 'react-router-dom';

class NotFoundPage extends React.Component {
  render(){
    return (
      <div>
        <h1>404: Page Not Found dude!</h1>
        <p><Link to='/'>Back to Home</Link></p>
      </div>
    );
  }
}
module.exports = NotFoundPage;
