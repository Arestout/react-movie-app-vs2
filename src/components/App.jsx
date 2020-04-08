import React from 'react';
import Header from './Header/Header';
import { API_URL, API_KEY_3, fetchApi } from '../api/api';
import Cookies from 'universal-cookie';
import CallApi from '../api/api';
import LoginModal from './Header/Login/LoginModal';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import MoviePage from './pages/MoviePage/MoviePage';
import { BrowserRouter, Route, Link } from 'react-router-dom';

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

  updateSessionId = (session_id) => {
    cookies.set('session_id', session_id, {
      path: '/',
      maxAge: 2592000,
    });
    this.setState({
      session_id,
    });
  };

  getFavoriteMovies = ({ session_id, user }) => {
    return CallApi.get(`/account/${user.id}/favorite/movies`, {
      params: {
        session_id: session_id,
      },
    }).then((data) => {
      this.setState({
        favoriteMovies: data.results,
      });
    });
  };

  getWatchListMovies = ({ session_id, user }) => {
    return CallApi.get(`/account/${user.id}/watchlist/movies`, {
      params: {
        session_id: session_id,
      },
    }).then((data) => {
      this.setState({
        watchListMovies: data.results,
      });
    });
  };

  componentDidMount() {
    const session_id = cookies.get('session_id');
    if (session_id) {
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      ).then((user) => {
        this.updateSessionId(session_id);
        this.updateUser(user);
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.user && this.state.user && this.state.session_id) {
      this.getFavoriteMovies({
        session_id: this.state.session_id,
        user: this.state.user,
      });
      this.getWatchListMovies({
        session_id: this.state.session_id,
        user: this.state.user,
      });
    }
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
    const { user, session_id, favoriteMovies, watchListMovies } = this.state;
    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user: user,
            session_id: session_id,
            updateUser: this.updateUser,
            updateSessionId: this.updateSessionId,
            onLogOut: this.onLogOut,
            favoriteMovies: favoriteMovies,
            watchListMovies: watchListMovies,
            getFavoriteMovies: this.getFavoriteMovies,
            getWatchListMovies: this.getWatchListMovies,
            toggleLoginModal: this.toggleLoginModal,
          }}
        >
          <>
            <Header />
            <Route exact path="/" component={MoviesPage} />
            <Route path="/movie/:id/" component={MoviePage} />
            <LoginModal
              showLoginModal={this.state.showLoginModal}
              toggleLoginModal={this.toggleLoginModal}
            />
          </>
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}
