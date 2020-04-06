import React, { Component } from 'react';
import AppContextHOC from '../HOC/AppContextHOC';
import { Bookmark, BookmarkBorder } from '@material-ui/icons';

class BookmarkBtn extends Component {
  handleOnclick = (item) => {
    if (this.props.session_id) {
      this.props.addToWatchlist(item);
    } else this.props.toggleLoginModal();
  };

  render() {
    const { item, watchListMovies, addToWatchlist } = this.props;
    return (
      <button
        type="button"
        className="btn"
        onClick={() => addToWatchlist(item)}
      >
        {watchListMovies.some((movie) => movie.id === item.id) ? (
          <Bookmark />
        ) : (
          <BookmarkBorder />
        )}
      </button>
    );
  }
}

export default AppContextHOC(BookmarkBtn);
