import React from 'react';
import axios from './client';
import Movie from './Movie';
import { Link } from '@reach/router';

class Movies extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      movies: [],
      search_string: "",
      error: null
    }
  }
  componentDidMount() {
    this.getPopularMovies();
  }
  handleChange(event) {
    this.setState({
      search_string: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault();
    const search_string = this.state.search_string
    search_string ? this.searchForMovie(search_string) : this.getPopularMovies()
  }
  searchForMovie(search_string) {
    axios.get('search/movie', {
      params: {
        query: search_string
      }
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
      <div className="movies-container">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="movie-search">
            Search<br></br>
            <input id="movie-search" type="text" placeholder="Enter Movie Title" onChange={this.handleChange} value={this.state.search_string} />
            <button type="submit">Search</button>
          </label>
        </form>
        <div id="movies">
          {this.state.movies.map(movie =>
            (
              <Link to={`/${movie.id}`} key={movie.id}>
                <Movie movie={movie} />
              </Link>
            )
          )}
        </div>
      </div>
    )
  }
}

export default Movies;