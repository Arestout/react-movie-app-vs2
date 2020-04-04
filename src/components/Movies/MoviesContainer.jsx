import React, { Component } from 'react';
import queryString from 'query-string';
import { isEqual } from 'lodash';
import MoviesList from './MoviesList';
import { API_URL, API_KEY_3 } from '../../api/api';

export default class MoviesContainer extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      isLoading: false,
    };
  }

  getMovies = (filters, page) => {
    this.setState({
      isLoading: true,
    });
    const { sort_by, year, with_genres } = filters;
    const queryStringParam = {
      api_key: API_KEY_3,
      language: 'en-US',
      sort_by,
      page,
      year,
    };
    if (with_genres.length > 0) {
      queryStringParam.with_genres = with_genres.join(',');
    }

    const link = `${API_URL}/discover/movie?${queryString.stringify(
      queryStringParam
    )}`;

    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          movies: data.results,
          isLoading: false,
        });

        this.props.onChangePagination({
          page: data.page,
          total_pages: data.total_pages,
        });
      });
  };

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.page);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.filters, this.props.filters)) {
      this.props.onChangePagination(1);
      this.getMovies(this.props.filters, 1);
    }

    if (prevProps.page !== this.props.page) {
      this.getMovies(this.props.filters, this.props.page);
    }
  }

  render() {
    const { movies, isLoading } = this.state;

    if (isLoading) {
      return (
        <div className="row">
          <h3>Loading...</h3>
        </div>
      );
    }

    return <MoviesList movies={movies} />;
  }
}
