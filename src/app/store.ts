import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../features/auth/authSlice";
// import { booksApi } from "../features/books/bookAPI";

export const store = configureStore({
  reducer: {
    // ? Add the authReducer to the reducer object
    // authUser: authReducer,
    // [books.reducerPath]: books.reducer,
  },
  // ? show the devTools only in development
  devTools: process.env.NODE_ENV !== "production",
  // Adding the api middleware enables caching, invalidation, polling...
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware({}).concat([booksApi.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
