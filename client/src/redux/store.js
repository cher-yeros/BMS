import { combineReducers, configureStore } from "@reduxjs/toolkit";
import attractionSiteReducer from "./attractionSiteSlice";
import authReducer from "./authSlice";
import hotelReducer from "./hotelSlice";
import regionReducer from "./regionSlice";
import userReducer from "./userSlice";
import adminReducer from "./adminSlice";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  hotel: hotelReducer,
  attractionSite: attractionSiteReducer,
  region: regionReducer,
  admin: adminReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
