import React, { Component } from 'react';
import AppContextHOC from '../HOC/AppContextHOC';
import { StarBorder, Star } from '@material-ui/icons';

class StarBtn extends Component {
  handleOnClick = (item) => {
    if (this.props.session_id) {
      this.props.addToFavorites(item);
    } else {
      this.props.toggleLoginModal();
    }
  };

  render() {
    const { item, favoriteMovies } = this.props;

    return (
      <button
        type="button"
        className="btn"
        onClick={() => this.handleOnClick(item)}
      >
        {favoriteMovies.some((movie) => movie.id === item.id) ? (
          <Star />
        ) : (
          <StarBorder />
        )}
      </button>
    );
  }
}

export default AppContextHOC(StarBtn);
