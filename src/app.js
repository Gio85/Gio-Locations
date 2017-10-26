import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

  render() {
    return (
      <h1>Share your trip Homepage</h1>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
