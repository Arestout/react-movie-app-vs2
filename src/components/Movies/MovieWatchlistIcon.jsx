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

  updateLoading = (value) => {
    this.setState({
      isLoading: value,
    });
  };

  toggleWatchlistMovies = () => {
    const { movie, user, session_id, getWatchListMovies } = this.props;

    const queryStringParams = {
      media_type: 'movie',
      media_id: movie.id,
      watchlist: !this.isFavorite(),
    };

    this.updateLoading(true);

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
      .then(() => this.updateLoading(false));
  };

  isFavorite = () =>
    this.props.watchListMovies.some(
      (watchListMovie) => watchListMovie.id === this.props.movie.id
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