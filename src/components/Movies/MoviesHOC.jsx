import React from 'react';
import { isEqual } from 'lodash';
import CallApi from '../../api/api';

export default (Component) =>
  class MoviesHOC extends React.Component {
    constructor() {
      super();

      this.state = {
        movies: [],
        favoriteMovies: [],
        watchList: [],
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

    // getFavoriteMovies = () => {
    //   CallApi.get('/account/{account_id}/favorite/movies', {
    //     params: {
    //       session_id: this.props.session_id,
    //     },
    //   }).then((data) => {
    //     this.setState({
    //       favoriteMovies: data.results,
    //     });
    //   });
    // };

    // getWatchList = () => {
    //   CallApi.get('/account/{account_id}/watchlist/movies', {
    //     params: {
    //       session_id: this.props.session_id,
    //     },
    //   }).then((data) => {
    //     this.setState({
    //       watchList: data.results,
    //     });
    //   });
    // };

    getFavoritesAndWatchlist = (url, list) => {
      CallApi.get(url, {
        params: {
          session_id: this.props.session_id,
        },
      }).then((data) => {
        this.setState({
          [list]: data.results,
        });
      });
    };

    handleAddingMovies = (args) => {
      const { url, movieId, name, action } = args;
      const queryStringParams = {
        media_type: 'movie',
        media_id: movieId,
        [name]: action,
      };
      console.log(movieId);
      CallApi.post(url, {
        params: {
          session_id: this.props.session_id,
        },
        body: queryStringParams,
      });
    };

    addToFavorites = (movie) => {
      let action = this.state.favoriteMovies.some(
        (favMovie) => favMovie.id === movie.id
      )
        ? false
        : true;

      this.handleAddingMovies({
        url: '/account/{account_id}/favorite',
        movieId: movie.id,
        name: 'favorite',
        action: action,
      });
      let updateFavoriteMovies = [];

      if (action) {
        updateFavoriteMovies = [...this.state.favoriteMovies];
        updateFavoriteMovies.push(movie);
      } else {
        updateFavoriteMovies = this.state.favoriteMovies.filter(
          (favMovie) => favMovie.id !== movie.id
        );
      }

      this.setState({
        favoriteMovies: updateFavoriteMovies,
      });
    };

    addToWatchlist = (movie) => {
      let action = this.state.watchList.some(
        (watchMovie) => watchMovie.id === movie.id
      )
        ? false
        : true;

      this.handleAddingMovies({
        url: '/account/{account_id}/watchlist',
        movieId: movie.id,
        name: 'watchlist',
        action: action,
      });
      const updateWatchList = [...this.state.watchList];

      action
        ? this.state.watchList.filter(
            (watchMovie) => watchMovie.id !== movie.id
          )
        : updateWatchList.push(movie);

      this.setState({
        willWatch: updateWatchList,
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

      if (prevProps.session_id !== this.props.session_id) {
        this.getFavoritesAndWatchlist(
          '/account/{account_id}/favorite/movies',
          'favoriteMovies'
        );
        this.getFavoritesAndWatchlist(
          '/account/{account_id}/watchlist/movies',
          'watchList'
        );

        if (!this.props.session_id) {
          this.setState({
            favoriteMovies: [],
            watchList: [],
          });
        }
      }
    }

    render() {
      const { movies, favoriteMovies, watchList, isLoading } = this.state;

      if (isLoading) {
        return (
          <div className="row">
            <h3>Loading...</h3>
          </div>
        );
      }

      return (
        <Component
          movies={movies}
          favoriteMovies={favoriteMovies}
          watchList={watchList}
          addToFavorites={this.addToFavorites}
          addToWatchlist={this.addToWatchlist}
          getFavoritesAndWatchlist={this.getFavoritesAndWatchlist}
        />
      );
    }
  };
