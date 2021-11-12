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

const initialApp = {
  movies: null,
  loading: false,
  isFavorite: null,
  favorite: [],
};

let id = 1;

const appReducers = (state = initialApp, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return { ...state, loading: true };
    case SET_MOVIES:
      return { ...state, loading: false, movies: action.payload };
    case GET_MORE_MOVIES:
      return { ...state, loading: true };
    case SET_MORE_MOVIES:
      return {
        ...state,
        loading: false,
        movies: {
          ...state.movies,
          results: state.movies.results.concat(action.payload),
        },
      };
    case ADD_FAVORITE:
      return {
        ...state,
        favorite: [...state.favorite, { ...action.payload, id: id++ }],
      };
    case REMOVE_FAVORITE:
      const filterFavoriteByID = state.favorite.filter(
        (fav) => fav.id !== action.payload.id
      );
      return { ...state, favorite: filterFavoriteByID };
    case SET_IS_FAVORITE:
      return { ...state, isFavorite: action.payload };
    case ADD_MOVIES_TO_FAVORITE:
      const findFavorite = state.favorite.find(
        (fav) => fav.id === action.payload.favList.id
      );

      findFavorite.movies.push(action.payload.movies);

      return state;
    case REMOVE_MOVIES_FROM_FAVORITE:
      const findFavoriteFromRemove = state.favorite.find(
        (fav) => fav.id === action.payload.favList.id
      );

      findFavoriteFromRemove.movies.filter(
        (fav) => fav.id !== action.payload.movies.id
      );

      console.log(findFavoriteFromRemove, "HERE");

      return {
        ...state,
        favorite: [...state.favorite, findFavoriteFromRemove],
      };
    default:
      return state;
  }
};

export default appReducers;
