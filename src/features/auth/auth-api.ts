import { apiSlice } from "../api/api-slice";
import { IUser, IGenericResponse } from "../api/types";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      { token: string; name: string; status: string },
      any
    >({
      query: (body: { email: string; password: string }) => {
        return {
          url: "/users/login",
          method: "POST",
          body,
        };
      },
    }),
    registerUser: builder.mutation<IGenericResponse, any>({
      query: (body: { name: string; email: string; password: string }) => {
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
