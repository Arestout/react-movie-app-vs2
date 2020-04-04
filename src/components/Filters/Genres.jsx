import React from 'react';
import PropTypes from 'prop-types';
import GenresHOC from './GenresHOC';

const Genres = ({ genres, with_genres, onChange }) => (
  <div className="form-group">
    {genres.map((genre) => {
      return (
        <div className="form-check" key={genre.id}>
          <input
            className="form-check-input"
            type="checkbox"
            id={genre.name}
            name={genre.name}
            checked={with_genres.includes(String(genre.id))}
            value={genre.id}
            onChange={onChange}
          />
          <label className="form-check-label" htmlFor={genre.name}>
            {genre.name}
          </label>
        </div>
      );
    })}
  </div>
);

Genres.defaultProps = {
  genres: [],
};

Genres.propTypes = {
  genres: PropTypes.array.isRequired,
  with_genres: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default GenresHOC(Genres);
