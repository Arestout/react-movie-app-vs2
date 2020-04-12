import React from 'react';
import { Link } from 'react-router-dom';
import MovieFavoriteIcon from './MovieFavoriteIcon';
import MovieWatchlistIcon from './MovieWatchlistIcon';
import Image from '../UIComponents/Image';

class MovieItem extends React.PureComponent {
  render() {
    const { movie } = this.props;

    const imagePath = movie.backdrop_path || movie.image_path;

    return (
      <div className="card">
        <Image
          className="card-img-top card-img--height"
          imagePath={imagePath ? imagePath : 'j91XDQPq9spZHias8PpwVdlDxna.jpg'}
          alt={movie.title}
        />
        <div className="container">
          <div className="row row-cols-2">
            <div className="col card-body">
              <Link className="card-title" to={`/movie/${movie.id}`}>
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
