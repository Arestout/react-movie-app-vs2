import * as types from './auth.types';
import { cookies } from '../../utils/cookies';

const initialState = {
  user: null,
  session_id: cookies.get('session_id'),
  isAuth: false,
  showLoginModal: false,
  favoriteMovies: [],
  watchListMovies: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SUCCESS_AUTH:
      return {
        ...state,
        user: action.payload.user,
        session_id: action.payload.session_id,
        isAuth: true,
      };
    case types.LOGOUT:
      return {
        ...initialState,
      };
    case types.TOGGLE_LOGIN_MODAL:
      return {
        ...state,
        showLoginModal: !state.showLoginModal,
      };
    case types.UPDATE_FAVORITE_MOVIES:
      return {
        ...state,
        favoriteMovies: action.payload,
      };
    case types.UPDATE_WATCH_LIST_MOVIES:
      return {
        ...state,
        watchListMovies: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
