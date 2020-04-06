import React from 'react';
import Header from './Header/Header';
import Filters from './Filters/Filters';
import MoviesList from './Movies/MoviesList';
import { API_URL, API_KEY_3, fetchApi } from '../api/api';
import Cookies from 'universal-cookie';
import CallApi from '../api/api';
import { Modal, ModalBody } from 'reactstrap';
import LoginForm from './Header/Login/LoginForm';
import { isEqual } from 'lodash';

const cookies = new Cookies();
export const AppContext = React.createContext();
export default class App extends React.Component {
  constructor() {
    super();

    this.initialState = {
      user: null,
      session_id: null,
      favoriteMovies: [],
      watchListMovies: [],
      filters: {
        sort_by: 'popularity.desc',
        year: 'default',
        with_genres: [],
      },
      page: 1,
      total_pages: null,
      showLoginModal: false,
    };

    this.state = this.initialState;
  }

  updateUser = (user) => {
    this.setState({
      user,
    });
  };

  onLogOut = () => {
    cookies.remove('session_id');
    this.setState({
      session_id: null,
      user: null,
      favoriteMovies: [],
      watchListMovies: [],
    });
  };

  updateSessionID = (session_id) => {
    cookies.set('session_id', session_id, {
      path: '/',
      maxAge: 2592000,
    });
    this.setState({
      session_id,
    });
  };

  onChangeFilters = (event) => {
    const { name, value } = event.target;
    this.setState((state) => ({
      filters: {
        ...state.filters,
        [name]: value,
      },
    }));
  };

  onChangePagination = ({ page, total_pages = this.state.total_pages }) => {
    this.setState({
      page,
      total_pages,
    });
  };

  getFavoriteMovies = () => {
    CallApi.get('/account/{account_id}/favorite/movies', {
      params: {
        session_id: this.state.session_id,
      },
    }).then((data) => {
      this.setState({
        favoriteMovies: data.results,
      });
    });
  };

  addToFavorites = (movie) => {
    const isFavorite = this.state.favoriteMovies.some(
      (favMovie) => favMovie.id === movie.id
    );

    const queryStringParams = {
      media_type: 'movie',
      media_id: movie.id,
      favorite: !isFavorite,
    };

    CallApi.post('/account/{account_id}/favorite', {
      params: {
        session_id: this.state.session_id,
      },
      body: queryStringParams,
    }).then(() => this.getFavoriteMovies());
  };

  getWatchListMovies = () => {
    CallApi.get('/account/{account_id}/watchlist/movies', {
      params: {
        session_id: this.state.session_id,
      },
    }).then((data) => {
      this.setState({
        watchListMovies: data.results,
      });
    });
  };

  addToWatchlist = (movie) => {
    const isWatchlist = this.state.watchListMovies.some(
      (watchMovie) => watchMovie.id === movie.id
    );

    const queryStringParams = {
      media_type: 'movie',
      media_id: movie.id,
      watchlist: !isWatchlist,
    };

    CallApi.post('/account/{account_id}/watchlist', {
      params: {
        session_id: this.state.session_id,
      },
      body: queryStringParams,
    }).then(() => this.getWatchListMovies());
  };

  componentDidMount() {
    const session_id = cookies.get('session_id');
    if (session_id) {
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      ).then((user) => {
        this.updateUser(user);
        this.updateSessionID(session_id);
        this.getFavoriteMovies();
        this.getWatchListMovies();
      });
    } else {
      this.setState((state) => ({
        showLoginModal: !state.showLoginModal,
      }));
    }
  }

  componentDidUpdate(prevProps) {
    // if (prevProps.session_id !== this.props.session_id) {
    //   this.getFavoriteMovies();
    //   this.getWatchListMovies();
    // }
    // if (!isEqual(prevProps.favoriteMovies, this.state.favoriteMovies)) {
    //   this.getFavoriteMovies();
    // }
  }

  toggleLoginModal = () => {
    this.setState((state) => ({
      showLoginModal: !state.showLoginModal,
    }));
  };

  resetFilters = () => {
    this.setState(this.initialState);
  };

  render() {
    const {
      filters,
      page,
      total_pages,
      user,
      session_id,
      favoriteMovies,
      watchListMovies,
    } = this.state;
    return (
      <AppContext.Provider
        value={{
          user: user,
          session_id: session_id,
          updateUser: this.updateUser,
          updateSessionID: this.updateSessionID,
          onLogOut: this.onLogOut,
          favoriteMovies: favoriteMovies,
          watchListMovies: watchListMovies,
          addToFavorites: this.addToFavorites,
          addToWatchlist: this.addToWatchlist,
          getFavoriteMovies: this.getFavoriteMovies,
          getWatchListMovies: this.getWatchListMovies,
          toggleLoginModal: this.toggleLoginModal,
        }}
      >
        <>
          <Header />
          <div className="container">
            <div className="row mt-4">
              <div className="col-4">
                <div className="card">
                  <div className="card-body">
                    <h3>Filters:</h3>
                    <Filters
                      filters={filters}
                      page={page}
                      total_pages={total_pages}
                      onChangeFilters={this.onChangeFilters}
                      onChangePagination={this.onChangePagination}
                      resetFilters={this.resetFilters}
                    />
                  </div>
                </div>
              </div>
              <div className="col-8">
                <MoviesList
                  filters={filters}
                  page={page}
                  session_id={session_id}
                  onChangePagination={this.onChangePagination}
                />
              </div>
            </div>
            <Modal
              isOpen={this.state.showLoginModal}
              toggle={this.toggleLoginModal}
            >
              <ModalBody>
                <LoginForm />
              </ModalBody>
            </Modal>
          </div>
        </>
      </AppContext.Provider>
    );
  }
}
