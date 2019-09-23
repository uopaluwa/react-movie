import React from 'react';
import axios from './client';
import Movies from './Movies';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      error: null
    }
  }
  componentDidMount() {
    this.getPopularMovies();
  }
  getPopularMovies() {
    axios.get('discover/movie', {
      sort_by: 'popularity_desc'
    })
    .then(response => {
      if (response.data && response.data.results) {
        this.setState({
          movies: response.data.results,
          error: null
        })
      }
    })
    .catch(error => {
      this.setState({
        error: 'An error occurred while retrieving data.'
      })
    })
  }
  render() {
    return (
      <div>
        <Movies movies={this.state.movies} />
      </div>
    )
  }
}

export default Home;
