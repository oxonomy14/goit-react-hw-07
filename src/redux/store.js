import { configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "./contactsSlice";
import { filtersReducer } from "./filterSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
/*
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer); */

const persistConfigContacts = {
  key: "contacts",
  version: 1,
  storage,
};

const persistConfigFilter = {
  key: "filters",
  version: 1,
  storage,
};

export const store = configureStore({
  reducer: {
    contactList: persistReducer(persistConfigContacts, contactsReducer),
    filters: persistReducer(persistConfigFilter, filtersReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

  //devTools: import.meta.env.MODE === 'development'
});

export let persistor = persistStore(store);
