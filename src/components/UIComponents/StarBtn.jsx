import React, { Component } from 'react';
import AppContextHOC from '../HOC/AppContextHOC';
import { StarBorder, Star } from '@material-ui/icons';

class StarBtn extends Component {
  render() {
    const { item, favoriteMovies, addToFavorites } = this.props;

    return (
      <button
        type="button"
        className="btn"
        onClick={() => addToFavorites(item)}
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
