import React from 'react';
import ReactDOM from 'react-dom';
import Movies from './Movies';

class App extends React.Component {
  render() {
    return (
      <div id="app">
        <Movies />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('main'))