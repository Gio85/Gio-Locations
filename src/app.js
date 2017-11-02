import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './components/utility/NavBar';
import Routes from './components/utility/Routes';

import 'font-awesome/css/font-awesome.css';

import './scss/style.scss';

class App extends React.Component {

  render() {
    return (
      <Router>
        <main>
          <header>
            <Navbar />
          </header>
          <Routes />
        </main>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
