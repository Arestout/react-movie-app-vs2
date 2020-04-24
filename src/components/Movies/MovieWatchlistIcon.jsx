import React, { Component } from 'react';
import { withAuth } from '../../hoc/withAuth';
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
    const { movie, auth, authActions } = this.props;

    const queryStringParams = {
      media_type: 'movie',
      media_id: movie.id,
      watchlist: !this.isFavorite(),
    };

    this.updateLoading(true);

    CallApi.post(`/account/${auth.user.id}/watchlist`, {
      params: {
        session_id: auth.session_id,
      },
      body: queryStringParams,
    })
      .then(() =>
        authActions.fetchWatchListMovies({
          session_id: auth.session_id,
          user: auth.user,
        })
      )
      .then(() => this.updateLoading(false));
  };

  isFavorite = () =>
    this.props.auth.watchListMovies.some(
      (watchListMovie) => watchListMovie.id === this.props.movie.id
    );

  handleClick = () => {
    if (this.props.auth.session_id) {
      this.toggleWatchlistMovies();
    } else {
      this.props.toggleLoginModal();
    }
  };

  render() {
    const { auth } = this.props;
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

export default withAuth(MovieWatchlistIcon);
