import React from 'react';
import ReactDOM from 'react-dom';
import Movies from './Movies';
import MovieDetails from './MovieDetails';
import NavBar from './NavBar';
import Footer from './Footer';
import { Router } from '@reach/router';

class App extends React.Component {
  render() {
    return (
      <div id="app">
        <NavBar />
        <Router>
          <Movies path="/" />
          <MovieDetails path="/:movie_id"/>
        </Router>
        <Footer />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('main'))