import { put, call, takeEvery, all, fork } from "redux-saga/effects";
import { request } from "~/utils/request";
import { setMoreMovies, setMovies } from "./action";
import { GET_MORE_MOVIES, GET_MOVIES } from "./type";

function* getMovies({ payload: pageMovies }) {
  try {
    const { data } = yield call(
      request.get,
      `/3/discover/movie?page=${pageMovies}`
    );

    yield put(setMovies(data));
  } finally {
  }
}

function* getMoreMovies({ payload: pageMoreMovies }) {
  try {
    const { data } = yield call(
      request.get,
      `/3/discover/movie?page=${pageMoreMovies}`
    );

    yield put(setMoreMovies(data.results));
  } finally {
  }
}

export function* watchGetMovies() {
  yield takeEvery(GET_MOVIES, getMovies);
}

export function* watchGetMoreMovies() {
  yield takeEvery(GET_MORE_MOVIES, getMoreMovies);
}

function* appSaga() {
  yield all([fork(watchGetMovies), fork(watchGetMoreMovies)]);
}

export default appSaga;
