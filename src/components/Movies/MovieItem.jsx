import React from 'react';
import MovieFavoriteIcon from './MovieFavoriteIcon';
import MovieWatchlistIcon from './MovieWatchlistIcon';

class MovieItem extends React.PureComponent {
  render() {
    const { item } = this.props;

    const imagePath = item.backdrop_path || item.image_path;

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
              <h6 className="card-title">{item.title}</h6>
              <div className="card-text">Rating: {item.vote_average}</div>
            </div>
            <div className="col align-self-end card-body">
              <MovieFavoriteIcon item={item} movieId={item.id} />
              <MovieWatchlistIcon item={item} movieId={item.id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieItem;
