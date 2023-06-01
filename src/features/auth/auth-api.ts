import { apiSlice } from "../api/api-slice";
import { IGenericResponse } from "../api/types";

export interface IRegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface ILoginCredentials {
  username: string;
  password: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<IGenericResponse, any>({
      query: (body: ILoginCredentials) => {
        return {
          url: "/users/login",
          method: "POST",
          body,
        };
      },
    }),
    registerUser: builder.mutation<IGenericResponse, any>({
      query: (body: IRegisterCredentials) => {
        return {
          url: "/users/register",
          method: "POST",
          body,
        };
      },
    }),
    getUser: builder.query<IGenericResponse, any>({
      query: (token) => {
        return {
          url: "/users/user",
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
      // transformResponse: () => {},
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserQuery,
} = authApi;
