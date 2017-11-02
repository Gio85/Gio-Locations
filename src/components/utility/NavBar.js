import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';

const Navbar = ({ history }) => {

  function logout(e) {
    e.preventDefault();

    Auth.logout();
    history.push('/');
  }

  return(
    <nav>
      <div className="container-fluid">
        <ul className="navWrap">
          <div className="navLeft">
            <img src="https://s-media-cache-ak0.pinimg.com/originals/91/91/4b/91914b39e7610bb50c01081531ecb813.png" className="logo"/>
            <Link className="navItem navLogo" to="/">Home</Link>
            <li className="navItem">
              <Link to="/trips">
              Trips
              </Link>
            </li>
          </div>
          <div className="navRight">
            {Auth.isAuthenticated() && <li className="navItem">
              <Link to="/trips/new">
                <i className="fa fa-plus" aria-hidden="true"></i>Add Trip
              </Link>
            </li>}
            {Auth.isAuthenticated() && <li className="navItem">
              <Link to={`/users/${Auth.getPayload().userId}`}>Profile</Link>
            </li>}
            {Auth.isAuthenticated() && <li className="navItem">
              <Link to="/conversations">Conversations</Link>
            </li>}
            {!Auth.isAuthenticated() && <li className="navItem">
              <Link to="/login">Login</Link>
            </li>}
            {!Auth.isAuthenticated() && <li className="navItem">
              <Link to="/register">Register</Link>
            </li>}
            {Auth.isAuthenticated() && <li className="navItem">
              <button onClick={logout} className="navLink">Logout</button>
            </li>}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
