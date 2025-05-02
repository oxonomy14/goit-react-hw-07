import { createSlice, isAnyOf, createSelector } from "@reduxjs/toolkit";
import { fetchContacts, deleteContact, addContact } from "./contactsOps";
import { selectNameFilter } from "./filterSlice";

const initialState = {
  contacts: {
    items: [],
    loading: false,
    error: null,
  },
};

export const selectContacts = (state) => state.contactList.contacts.items;
export const selectLoading = (state) => state.contactList.contacts.loading;
export const selectError = (state) => state.contactList.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, name) => {
    return contacts.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
  }
);

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
          state.contacts.error = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          addContact.pending,
          deleteContact.pending,
          fetchContacts.pending
        ),
        (state, action) => {
          state.contacts.error = null;
          state.contacts.loading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          addContact.fulfilled,
          deleteContact.fulfilled,
          fetchContacts.fulfilled
        ),
        (state, action) => {
          state.contacts.loading = false;
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
