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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">Trips</Link>
      <ul className="navbar-nav right">
        <li className="nav-item">
          {Auth.isAuthenticated() && <Link to="/trips/new" className="main-button">
            <i className="fa fa-plus" aria-hidden="true"></i>Add Trip
          </Link>}
        </li>
        <li className="nav-item">
          {!Auth.isAuthenticated() && <Link to="/login" className="nav-link">Login</Link>}
        </li>
        <li className="nav-item">
          {!Auth.isAuthenticated() && <Link to="/register" className="nav-link">Register</Link>}
        </li>
        <li className="nav-item">
          {Auth.isAuthenticated() && <button onClick={logout} className="nav-link">Logout</button>}
        </li>
      </ul>
    </nav>
  );
};

export default withRouter(Navbar);
