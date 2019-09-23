import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import MovieDetails from './MovieDetails';
import NavBar from './NavBar';
import Footer from './Footer';
import BrowseMovies from './BrowseMovies';
import { Router } from '@reach/router';

class App extends React.Component {
  render() {
    return (
      <div id="app">
        <NavBar />
        <Router>
          <Home path="/" />
          <BrowseMovies path="/browse"/>
          <MovieDetails path="/:movie_id"/>
        </Router>
        <Footer />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('main'))
