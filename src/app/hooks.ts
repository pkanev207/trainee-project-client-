import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { selectAuth } from "../features/auth/auth-slice";
import { useEffect, useState } from "react";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface IUserState {
  token: string | null;
  name: string | null;
  role: string | null;
}

export const useGetUser = () => {
  const user: IUserState = useSelector(selectAuth);
  if (user.name && user.name) {
    return user;
  } else {
    return null;
  }
};

export const useDebounce = (value: string, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      console.log("setting a new timeout");
      setDebouncedValue(value);
    }, delay);

    return () => {
      console.log("clearing the timeout");
      clearTimeout(id);
    };
  }, [value, delay]);

  return debouncedValue;
};

// const name: string = emp.name!; // non-null assertion
// const name: string = emp.name as string; // type assertion
// const name: string = emp.name !== null ? emp.name : ''
// const name: string = emp.name ?? ''
// const name: string = emp.name || ''
// const name: string | null = emp.name
