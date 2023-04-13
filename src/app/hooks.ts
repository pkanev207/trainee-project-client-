import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { selectAuth } from "../features/auth/auth-slice";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface userState {
  token: string | null;
  name: string | null;
}

export const useGetUser = () => {
  const user: userState = useSelector(selectAuth);
  if (user.name && user.name) {
    return user;
  } else {
    return null;
  }
};

// const name: string = emp.name!; // non-null assertion
// const name: string = emp.name as string; // type assertion
// const name: string = emp.name !== null ? emp.name : ''
// const name: string = emp.name ?? ''
// const name: string = emp.name || ''
// const name: string | null = emp.name
