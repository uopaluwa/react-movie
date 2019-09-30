import React from 'react';
import { Link } from '@reach/router';

const image_size = 'w200';
const poster_base_url = `https://image.tmdb.org/t/p/${image_size}`;

class Movie extends React.Component {
  shortenMovieTitleString(title) {
    return title.length < 25 ? title : title.substring(0, 25) + '...' 
  }
  render() {
    const { movie } = this.props;
    const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : null;
    const movieTitle = this.shortenMovieTitleString(movie.title);
    const movieRating = movie.vote_average ? `${movie.vote_average}/10` : null;
    //check poster path, if null use a default img to preserve shape of movie components
    return (
      <div className="movie">
        <Link to={`/${movie.id}`}>
          <div className="poster">
            <img src={poster_base_url + movie.poster_path} alt="movie poster"/>
            <div className="highlights">
              <p>⭐️</p>
              <p>{movieRating}</p>
              <button>View Details</button>
            </div>
          </div>
          <p>{movieTitle}</p>
        </Link>
        <span>{releaseYear}</span>
      </div>
    )
  }
}

export default Movie;
