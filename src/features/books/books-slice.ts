import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IBooksState } from "../../definitions";

const initialState: IBooksState = {
  bookSearch: "",
  pageNumber: 1,
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    searchBook: (state, action: PayloadAction<string>) => {
      state.bookSearch = action.payload;
    },
    clearSearchBook: (state) => {
      state.bookSearch = "";
    },
    changePageNumber: (
      state,
      action: PayloadAction<{ pageNumber: number }>
    ) => {
      state.pageNumber = action.payload.pageNumber as unknown as number;
    },
  },
});

export const selectBooksData = (state: RootState) => state.books;

export const { searchBook, clearSearchBook, changePageNumber } =
  booksSlice.actions;
export default booksSlice.reducer;
