import React from 'react';
import { isEqual } from 'lodash';
import CallApi from '../../api/api';
import { LoaderSpinner } from '../UIComponents/LoaderSpinner';

export default (Component) =>
  class MoviesHOC extends React.Component {
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
      const queryStringParams = {
        language: 'en-US',
        sort_by,
        page,
        year,
      };
      if (with_genres.length > 0) {
        queryStringParams.with_genres = with_genres.join(',');
      }

      CallApi.get('/discover/movie', {
        params: queryStringParams,
      }).then((data) => {
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
            <LoaderSpinner />
          </div>
        );
      }

      return <Component movies={movies} />;
    }
  };
