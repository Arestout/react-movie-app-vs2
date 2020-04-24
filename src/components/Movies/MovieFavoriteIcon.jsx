import React, { Component } from 'react';
import { withAuth } from '../../hoc/withAuth';
import { StarBorder, Star } from '@material-ui/icons';
import CallApi from '../../api/api';

class MovieFavoriteIcon extends Component {
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

  toggleFavorites = () => {
    const { movie, auth, authActions } = this.props;

    const queryStringParams = {
      media_type: 'movie',
      media_id: movie.id,
      favorite: !this.isFavorite(),
    };

    this.updateLoading(true);

    CallApi.post(`/account/${auth.user.id}/favorite`, {
      params: {
        session_id: auth.session_id,
      },
      body: queryStringParams,
    })
      .then(() =>
        authActions.fetchFavoriteMovies({
          session_id: auth.session_id,
          user: auth.user,
        })
      )
      .then(() => this.updateLoading(false));
  };

  isFavorite = () =>
    this.props.auth.favoriteMovies.some(
      (favoriteMovie) => favoriteMovie.id === this.props.movie.id
    );

  handleClick = () => {
    if (this.props.auth.session_id) {
      this.toggleFavorites();
    } else {
      this.props.authActions.toggleLoginModal();
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
        {this.isFavorite() ? <Star /> : <StarBorder />}
      </button>
    );
  }
}

export default withAuth(MovieFavoriteIcon);
