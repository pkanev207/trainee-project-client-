import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

import { selectAuth } from "../features/auth/auth-slice";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useGetUser = () => {
  const user = useSelector(selectAuth);
  if (user) {
    return user;
  } else {
    return null;
  }
};
