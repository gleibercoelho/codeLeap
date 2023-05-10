import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";

import userReducer from "../Actions/user/index";

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

const persistedUserReducer = persistReducer(
  persistConfig,
  userReducer
);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
});

export const persistor = persistStore(store);

export default store;
