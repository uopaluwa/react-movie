import React from 'react';
import axios from './client';
import Movies from './Movies';
import ReactPaginate from 'react-paginate';

class BrowseMovies extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changePage = this.changePage.bind(this);
    this.searchForMovie = this.searchForMovie.bind(this);
    this.state = {
      movies: [],
      search_string: "",
      currentPage: 0,
      totalPages: 0,
      totalResults: 0,
      error: null
    }
  }
  componentDidMount() {
    this.getPopularMovies();
  }
  changePage({ selected: pageNumber }) {
    //react-paginate is indexed from 0, hence the "+ 1"
    const newPageNumber = Number(pageNumber) + 1;
    if(newPageNumber && newPageNumber >= 1 && newPageNumber <= this.state.totalPages) {
      this.state.search_string ? this.searchForMovie(this.state.search_string, newPageNumber) : this.getPopularMovies(newPageNumber);
    }
    this.setState({currentPage: newPageNumber});
  }
  handleChange(event) {
    this.setState({
      search_string: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault();
    const search_string = this.state.search_string
    search_string ? this.searchForMovie(search_string) : this.getPopularMovies();
  }
  searchForMovie(search_string, page = 1) {
    axios.get('search/movie', {
      params: {
        query: search_string,
        page
      }
    })
    .then(response => {
      if (response.data && response.data.results) {
        this.setState({
          movies: response.data.results,
          currentPage: response.data.page,
          totalPages: response.data.total_pages,
          totalResults: response.data.total_results,
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
  getPopularMovies(page = 1) {
    page = Number(page)
    axios.get('discover/movie', {
      sort_by: 'popularity_desc',
      params: { page }
    })
    .then(response => {
      console.log("req was made");
      if (response.data && response.data.results) {
        this.setState({
          movies: response.data.results,
          currentPage: response.data.page,
          totalPages: response.data.total_pages,
          totalResults: response.data.total_results,
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
      <div className="browse-container">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="movie-search">
            <input id="movie-search" type="text" placeholder="Enter Movie Title" onChange={this.handleChange} value={this.state.search_string} />
            <button type="submit">Search</button>
          </label>
        </form>
        <Movies movies={this.state.movies} />
        <ReactPaginate 
          onPageChange={this.changePage} 
          marginPagesDisplayed={2}
          forcePage={this.state.currentPage - 1}
          disableInitialCallback={true} 
          pageRangeDisplayed={3} 
          pageCount={this.state.totalPages}
          pageClassName="pages"
          nextClassName="pages"
          previousClassName="pages"
          breakClassName="pages"
          activeClassName="selected-page"
          containerClassName="paginator" />
      </div>
    )
  }
}

export default BrowseMovies;
