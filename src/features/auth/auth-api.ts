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
          // credentials: "include",
          // data: form,
          // data: { rest },
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
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { accessToken } = data;
          // set state
          // dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserQuery,
  useRefreshMutation,
} = authApi;
