import React from 'react';

const image_size = 'w200';
const poster_base_url = `https://image.tmdb.org/t/p/${image_size}`;

class Movie extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <div className="movie">
        <div className="poster">
          <img src={poster_base_url + movie.poster_path} alt="movie poster"/>
        </div>
        <p>{movie.title}</p>
        <p>{movie.release_date.split('-')[0]}</p>
      </div>
    )
  }
}

export default Movie;