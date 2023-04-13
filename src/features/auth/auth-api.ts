import { apiSlice } from "../api/api-slice";
import { IGenericResponse } from "../api/types";

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<IGenericResponse, any>({
      query: (body: LoginCredentials) => {
        return {
          url: "/users/login",
          method: "POST",
          body,
        };
      },
    }),
    registerUser: builder.mutation<IGenericResponse, any>({
      query: (body: RegisterCredentials) => {
        return {
          url: "/users/register",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
