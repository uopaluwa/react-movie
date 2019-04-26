import React from 'react';
import axios from './client';

const image_size = 'w300';
const logo_size = 'w200';
const poster_base_url = `https://image.tmdb.org/t/p/${image_size}`;
const logo_base_url = `https://image.tmdb.org/t/p/${logo_size}`;

class MovieDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      movie: {},
      error: null,
      loading: true
    }
  }
  componentDidMount() {
    const movie_id = this.props.movie_id
    axios.get(`movie/${movie_id}`)
    .then(response => {
      if (response.status === 200 && response.data) {
        this.setState({
          movie: response.data,
          error: null,
          loading: false
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
    if(this.state.loading) {
      return <h1>Loading.....</h1>
    }
    const { movie } = this.state;
    const genres = movie.genres.map(genre => genre.name)
    return (
      <div id="details">
        <section>
          <div className="poster">
            <img src={poster_base_url + movie.poster_path} alt="movie poster"/>
          </div>
          <div>
            <h1>{movie.original_title}</h1>
            <h2>{movie.release_date.split('-')[0]}</h2>
            <p>{genres.join(' / ')}</p>
            <p>{movie.runtime} mins</p>
            <p>{movie.vote_average} *</p>
          </div>
        </section>
        <section className="production-companies">
          {movie.production_companies.map(company => (
            <div key={company.id}>
              <img src={poster_base_url + company.logo_path} alt="production company logo"/>
            </div>
          ))}
        </section>
        <section>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
        </section>
      </div>
    )
  }

}

export default MovieDetails;