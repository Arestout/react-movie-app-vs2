import React, { Component } from 'react';
import AppContextHOC from '../HOC/AppContextHOC';
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
    const { movie, user, session_id, getFavoriteMovies } = this.props;

    const queryStringParams = {
      media_type: 'movie',
      media_id: movie.id,
      favorite: !this.isFavorite(),
    };

    this.updateLoading(true);

    CallApi.post(`/account/${user.id}/favorite`, {
      params: {
        session_id: session_id,
      },
      body: queryStringParams,
    })
      .then(() =>
        getFavoriteMovies({
          session_id,
          user,
        })
      )
      .then(() => this.updateLoading(false));
  };

  isFavorite = () =>
    this.props.favoriteMovies.some(
      (favoriteMovie) => favoriteMovie.id === this.props.movie.id
    );

  handleClick = () => {
    if (this.props.session_id) {
      this.toggleFavorites();
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
        {this.isFavorite() ? <Star /> : <StarBorder />}
      </button>
    );
  }
}

export default AppContextHOC(MovieFavoriteIcon);
