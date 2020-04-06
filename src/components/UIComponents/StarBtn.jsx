import React, { Component } from 'react';
import AppContextHOC from '../HOC/AppContextHOC';
import { StarBorder, Star } from '@material-ui/icons';

class StarBtn extends Component {
  handleOnclick = (item) => {
    if (this.props.session_id) {
      this.props.addToFavorites(item);
    } else this.props.toggleLoginModal();
  };

  render() {
    const { item, favoriteMovies, addToFavorites } = this.props;

    return (
      <button type="button" className="btn" onClick={this.handleOnclick}>
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
