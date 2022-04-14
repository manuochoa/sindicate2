import { combineReducers, applyMiddleware, createStore } from "redux";
import thunkMiddleWare from "redux-thunk";
import multi from "redux-multi";
import commonReducer from "./commonReducer";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  //   FLUSH,
  //   REHYDRATE,
  //   PAUSE,
  //   PERSIST,
  //   PURGE,
  //   REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "counter",
  storage,
};

let reducers = combineReducers({
  common: commonReducer,
  //   counter: counterSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

// export default configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

let store = createStore(
  persistedReducer,
  applyMiddleware(thunkMiddleWare, multi)
);
// let store = createStore(reducers, applyMiddleware(thunkMiddleWare, multi));

window.store = store;

export default store;
