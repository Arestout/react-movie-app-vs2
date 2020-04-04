import React from 'react';
import { isEqual } from 'lodash';
import { StarBorder, Star, Bookmark, BookmarkBorder } from '@material-ui/icons';

export default class MovieItem extends React.PureComponent {
  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.favoriteMovies, this.props.favoriteMovies)) {
      this.props.getFavoritesAndWatchlist(
        '/account/{account_id}/favorite/movies',
        'favoriteMovies'
      );
    }

    if (!isEqual(prevProps.watchList, this.props.watchList)) {
      this.props.getFavoritesAndWatchlist(
        '/account/{account_id}/watchlist/movies',
        'watchList'
      );
    }
  }

  render() {
    const {
      item,
      favoriteMovies,
      watchList,
      addToFavorites,
      addToWatchlist,
    } = this.props;

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
              <button
                type="button"
                className="btn"
                onClick={() => addToFavorites(item)}
              >
                {favoriteMovies.some(
                  (movie) => movie.id === this.props.item.id
                ) ? (
                  <Star />
                ) : (
                  <StarBorder />
                )}
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => addToWatchlist(item)}
              >
                {watchList.some((movie) => movie.id === item.id) ? (
                  <Bookmark />
                ) : (
                  <BookmarkBorder />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
