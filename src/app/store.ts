import { configureStore } from "@reduxjs/toolkit";
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { apiSlice } from "../features/api/api-slice";
// import { authApi } from "../features/auth/auth-api";
// import { booksApi } from "../features/books/books-api";
import authReducer from "../features/auth/auth-slice";

import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    // ? Add the authReducer to the reducer object
    // authUser: authReducer,
    // [books.reducerPath]: books.reducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    // [authApi.reducerPath]: authApi.reducer, // ??? "api" ???
    // [booksApi.reducerPath]: booksApi.reducer,
    // [userApi.reducerPath]: userApi.reducer,
    // userState: userReducer,
  },
  // ? show the devTools only in development
  // devTools: process.env.NODE_ENV !== "production",
  // Adding the api middleware enables caching, invalidation, polling...
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({}).concat([authApi.middleware, userApi.middleware]),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(authApi.middleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
setupListeners(store.dispatch);
