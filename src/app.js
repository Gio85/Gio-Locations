import React from 'react';
import ReactDOM from 'react-dom';
import GoogleMap from './components/GoogleMap';

class App extends React.Component {

  render() {
    return (
      <main>
        <h1>Share your trip Homepage</h1>
        <GoogleMap center={{ lat: 51.515276, lng: -0.072328 }}/>
      </main>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
