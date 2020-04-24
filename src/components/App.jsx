import React from 'react';
import Header from './Header/Header';
import LoginModal from './Header/Login/LoginModal';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import MoviePage from './pages/MoviePage/MoviePage';
import { BrowserRouter, Route } from 'react-router-dom';
import { LoaderSpinner } from './UIComponents/LoaderSpinner';
import { withAuth } from '../hoc/withAuth';

export const AppContext = React.createContext();
class App extends React.Component {
  componentDidMount() {
    const { auth, authActions } = this.props;
    if (auth.session_id) {
      authActions.fetchAuth(auth.session_id);
    }
  }

  componentDidUpdate(prevProps) {
    const { auth, authActions } = this.props;
    if (!prevProps.auth.user && auth.user && auth.session_id) {
      authActions.fetchFavoriteMovies({
        session_id: auth.session_id,
        user: auth.user,
      });
      authActions.fetchWatchListMovies({
        session_id: auth.session_id,
        user: auth.user,
      });
    }
  }

  render() {
    const { auth } = this.props;

    return auth.isAuth || !auth.session_id ? (
      <BrowserRouter>
        <>
          <Header />
          <Route exact path="/" component={MoviesPage} />
          <Route path="/movie/:id/" component={MoviePage} />
          <LoginModal />
        </>
      </BrowserRouter>
    ) : (
      <LoaderSpinner />
    );
  }
}

export default withAuth(App);
