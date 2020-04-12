import React, { Component } from 'react';

export default class MovieDetails extends Component {
  render() {
    const { movie } = this.props;

    return (
      <div className="container mt-3">
        <div className="row mb-3">
          <div className="col-4 bold">Status</div>
          <div className="col-8">{movie.status}</div>
        </div>
        <div className="row mb-3">
          <div className="col-4 bold">Release date</div>
          <div className="col-8">
            {new Date(movie.release_date).toLocaleDateString()}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4 bold">Runtime</div>
          <div className="col-8">{movie.runtime} Minutes</div>
        </div>
        <div className="row mb-3">
          <div className="col-4 bold">Original Language</div>
          <div className="col-8">
            {movie.original_language === 'en'
              ? 'English'
              : movie.original_language}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4 bold">Production Countries</div>
          <div className="col-8">
            {movie.production_countries &&
              movie.production_countries.length > 0 &&
              movie.production_countries
                .map((country) => country.name)
                .join(', ')}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4 bold">Budget</div>
          <div className="col-8">
            {movie.budget &&
              movie.budget
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
            $
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4 bold">Revenue</div>
          <div className="col-8">
            {movie &&
              movie.revenue &&
              movie.revenue
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
            $
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4 bold">Production companies</div>
          <div className="col-8">
            {movie.production_companies &&
              movie.production_companies.length > 0 &&
              movie.production_companies
                .map((company) => company.name)
                .join(', ')}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4 bold">Genres</div>
          <div className="col-8">
            {movie.genres &&
              movie.genres.length > 0 &&
              movie.genres.map((company) => company.name).join(', ')}
          </div>
        </div>
      </div>
    );
  }
}
