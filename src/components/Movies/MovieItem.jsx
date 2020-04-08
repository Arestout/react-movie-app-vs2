import React from 'react';
import { Link } from 'react-router-dom';
import MovieFavoriteIcon from './MovieFavoriteIcon';
import MovieWatchlistIcon from './MovieWatchlistIcon';

class MovieItem extends React.PureComponent {
  render() {
    const { movie } = this.props;

    const imagePath = movie.backdrop_path || movie.image_path;

    return (
      <div className="card">
        <img
          className="card-img-top card-img--height"
          src={
            imagePath
              ? `https://image.tmdb.org/t/p/w500${imagePath}`
              : 'https://image.tmdb.org/t/p/w500/j91XDQPq9spZHias8PpwVdlDxna.jpg'
          }
          alt=""
        />
        <div className="container">
          <div className="row row-cols-2">
            <div className="col card-body">
              <Link className="card-title" to={`/movie/${movie.id}/details`}>
                {movie.title}
              </Link>
              <div className="card-text">Rating: {movie.vote_average}</div>
            </div>
            <div className="col align-self-end card-body">
              <MovieFavoriteIcon movie={movie} />
              <MovieWatchlistIcon movie={movie} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieItem;
