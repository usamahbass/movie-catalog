import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage";
import rootReducers from "./reducers";
import rootSaga from "./sagas";

const persistConfig = {
  key: "root",
  whitelist: ["app"],
  storage,
};

const persistedReducers = persistReducer(persistConfig, rootReducers);

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const composeEnhancers =
  (process.env.NODE_ENV !== "production" && // checking env is production
    typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || // disabled redux devtools in production
  compose;

export const storeConfiguration = () => {
  const store = createStore(
    persistedReducers,
    {},
    composeEnhancers(applyMiddleware(...middlewares))
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};
