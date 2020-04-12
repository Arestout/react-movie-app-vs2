import React from 'react';
import MovieFavoriteIcon from '../../Movies/MovieFavoriteIcon';
import MovieWatchlistIcon from '../../Movies/MovieWatchlistIcon';
import Image from '../../UIComponents/Image';

const MoviePreview = (props) => {
  const { movie } = props;
  const imagePath = movie.poster_path || movie.backdrop_path;
  return (
    <div className="row ml-5 mt-5">
      <div className="col-4">
        <Image
          className="rounded movie-page-image"
          imagePath={imagePath}
          alt={movie.title}
        />
      </div>
      <div className="col-8">
        <h2 className="title mb-4">{movie.title}</h2>
        <p className="mb-4">{movie.overview}</p>
        <p className="mb-4">Rating: {movie.vote_average}</p>
        <div className="card-body">
          <MovieFavoriteIcon movie={movie} />
          <MovieWatchlistIcon movie={movie} />
        </div>
      </div>
    </div>
  );
};

export default MoviePreview;
