import { getPopularMoviesList, searchMovie } from "api";
import {
  receiveMovies,
  requestMovies,
  returnMoviesNotFound,
} from "../dispatchers";

/**
 *
 * @param {*} storeName
 */
const fetchMovies = (storeName) => (dispatch) => {
  dispatch(requestMovies(storeName));

  return getPopularMoviesList().then((response) => {
    dispatch(receiveMovies(response.data, storeName));
  });
};

/**
 *
 * @param {*} storeName
 */
const searchMovies = (storeName) => (dispatch) => {
  dispatch(requestMovies(storeName));

  return searchMovie(storeName).then((response) => {
    if (response && response.data && response.data.length > 0) {
      dispatch(receiveMovies(response.data, storeName));
    } else {
      dispatch(returnMoviesNotFound(storeName));
    }
  });
};

/**
 *
 * @param {*} state
 * @param {*} storeName
 */
const shouldFetchMovies = (state, storeName) => {
  const { moviesReducer } = state;
  const movies = moviesReducer[storeName];

  if (!movies) {
    return true;
  }

  return (
    !movies ||
    (movies && !movies.result) ||
    (movies && movies.result && movies.result.length < 1)
  );
};

/**
 *
 * @param {*} storeName
 */
export const peekMovies = (storeName) => (dispatch, getState) => {
  if (shouldFetchMovies(getState(), storeName)) {
    return dispatch(fetchMovies(storeName));
  }
};

/**
 *
 * @param {*} storeName
 */
export const peekSearchMovies = (storeName) => (dispatch, getState) => {
  if (shouldFetchMovies(getState())) {
    return dispatch(searchMovies(storeName));
  }
};
