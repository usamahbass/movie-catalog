/**
 * MOVIES ACTIONS
 *
 */

import {
  ADD_FAVORITE,
  ADD_MOVIES_TO_FAVORITE,
  GET_MORE_MOVIES,
  GET_MOVIES,
  REMOVE_FAVORITE,
  REMOVE_MOVIES_FROM_FAVORITE,
  SET_IS_FAVORITE,
  SET_MORE_MOVIES,
  SET_MOVIES,
} from "./type";

export const getMovies = (page) => ({
  type: GET_MOVIES,
  payload: page,
});

export const setMovies = (moviesData) => ({
  type: SET_MOVIES,
  payload: moviesData,
});

export const getMoreMovies = (page) => ({
  type: GET_MORE_MOVIES,
  payload: page,
});

export const setMoreMovies = (moreMoviesData) => ({
  type: SET_MORE_MOVIES,
  payload: moreMoviesData,
});

/**
 * FAVORITE ACTIONS
 *
 */

export const addFavorite = (favorite) => ({
  type: ADD_FAVORITE,
  payload: favorite,
});

export const removeFavorite = (favorite) => ({
  type: REMOVE_FAVORITE,
  payload: favorite,
});

export const setIsFavorite = (isFavorite) => ({
  type: SET_IS_FAVORITE,
  payload: isFavorite,
});

export const addMoviesToFavorite = (favList, movies) => ({
  type: ADD_MOVIES_TO_FAVORITE,
  payload: { favList, movies },
});

export const removeMoviesFromFavorite = (favList, movies) => ({
  type: REMOVE_MOVIES_FROM_FAVORITE,
  payload: { favList, movies },
});
