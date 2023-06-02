import { apiSlice } from "../api/api-slice";
import {
  IGenericResponse,
  ILoginCredentials,
  IRegisterCredentials,
} from "../../definitions/types";

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
