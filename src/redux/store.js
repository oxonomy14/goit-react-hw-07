import { configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "./contactsSlice";
import { filtersReducer } from "./filterSlice";

export const store = configureStore({
  reducer: {
    contactList: contactsReducer,
    filters: filtersReducer,
  },

  //devTools: import.meta.env.MODE === 'development'
});
