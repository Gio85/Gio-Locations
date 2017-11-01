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
      <ul className="navWrap">
        <div className="navLeft">
          <Link className="navItem navLogo" to="/">Home</Link>
          <li className="navItem">
            <Link to="/trips">
            Trips
            </Link>
          </li>
        </div>
        <div className="navRight">
          <li className="navItem">
            {Auth.isAuthenticated() && <Link to="/trips/new">
              <i className="fa fa-plus" aria-hidden="true"></i>Add Trip
            </Link>}
          </li>
          <li className="navItem">
            {Auth.isAuthenticated() && <Link to={`/users/${Auth.getPayload().userId}`}>Profile</Link>}
          </li>
          <li className="navItem">
            {Auth.isAuthenticated() && <Link to="/conversations">Conversations</Link>
            }
          </li>
          <li className="navItem">
            {!Auth.isAuthenticated() && <Link to="/login">Login</Link>}
          </li>
          <li className="navItem">
            {!Auth.isAuthenticated() && <Link to="/register">Register</Link>}
          </li>
          <li className="navItem">
            {Auth.isAuthenticated() && <button onClick={logout} className="navLink">Logout</button>}
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default withRouter(Navbar);
