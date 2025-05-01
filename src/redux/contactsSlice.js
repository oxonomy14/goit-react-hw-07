import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchContacts, deleteContact, addContact } from "./contacts0ps";

const initialState = {
  contacts: {
    items: [],
    loading: false,
    error: null,
  },
};

const slice = createSlice({
  name: "contactList",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
      })
      /*   .addCase(fetchContacts.rejected, (state, action) => {
        state.contacts.error = action.payload;
      })*/
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.items.push(action.payload);
      })

      .addMatcher(
        isAnyOf(
          addContact.rejected,
          deleteContact.rejected,
          fetchContacts.rejected
        ),
        (state, action) => {
          state.error = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          addContact.pending,
          deleteContact.pending,
          fetchContacts.pending
        ),
        (state, action) => {
          state.error = null;
          state.loading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          addContact.fulfilled,
          deleteContact.fulfilled,
          fetchContacts.fulfilled
        ),
        (state, action) => {
          state.loading = false;
        }
      );
  },
});

/*export const {
  addContact,
  deleteContact,
  dataFulfilledOperation,
  setLoading,
  setError,
} = slice.actions;*/

export const contactsReducer = slice.reducer;
