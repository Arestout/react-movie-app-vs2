import React, { Component } from 'react';
import AppContextHOC from '../HOC/AppContextHOC';
import { Bookmark, BookmarkBorder } from '@material-ui/icons';
import CallApi from '../../api/api';

class MovieWatchlistIcon extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    };
  }

  toggleWatchlistMovies = () => {
    const { movieId, user, session_id, getWatchListMovies } = this.props;

    const queryStringParams = {
      media_type: 'movie',
      media_id: movieId,
      watchlist: !this.isFavorite(),
    };

    this.setState({
      isLoading: true,
    });

    CallApi.post(`/account/${user.id}/watchlist`, {
      params: {
        session_id: session_id,
      },
      body: queryStringParams,
    })
      .then(() =>
        getWatchListMovies({
          session_id,
          user,
        })
      )
      .then(() =>
        this.setState({
          isLoading: false,
        })
      );
  };

  isFavorite = () =>
    this.props.watchListMovies.some(
      (watchListMovie) => watchListMovie.id === this.props.movieId
    );

  handleClick = () => {
    if (this.props.session_id) {
      this.toggleWatchlistMovies();
    } else {
      this.props.toggleLoginModal();
    }
  };

  render() {
    return (
      <button
        type="button"
        className="btn"
        onClick={this.handleClick}
        disabled={this.state.isLoading}
      >
        {this.isFavorite() ? <Bookmark /> : <BookmarkBorder />}
      </button>
    );
  }
}

export default AppContextHOC(MovieWatchlistIcon);
