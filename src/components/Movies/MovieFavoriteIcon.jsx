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

  toggleFavorites = () => {
    const { movieId, user, session_id, getFavoriteMovies } = this.props;

    const queryStringParams = {
      media_type: 'movie',
      media_id: movieId,
      favorite: !this.isFavorite(),
    };

    this.setState({
      isLoading: true,
    });

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
      .then(() =>
        this.setState({
          isLoading: false,
        })
      );
  };

  isFavorite = () =>
    this.props.favoriteMovies.some(
      (favoriteMovie) => favoriteMovie.id === this.props.movieId
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
