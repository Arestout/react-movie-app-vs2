import React from 'react';
import PropTypes from 'prop-types';
import MovieItem from './MovieItem';
import MoviesHOC from './MoviesHOC';

const MoviesList = ({ movies }) => (
  <div className="row">
    {movies.length > 0 ? (
      movies.map((movie) => {
        return (
          <div key={movie.id} className="col-6 mb-4">
            <MovieItem movie={movie} />
          </div>
        );
      })
    ) : (
      <h3>No results found matching your criteria</h3>
    )}
  </div>
);

MoviesList.defaultProps = {
  movies: [],
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MoviesHOC(MoviesList);
