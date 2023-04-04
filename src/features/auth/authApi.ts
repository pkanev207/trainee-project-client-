import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  // route /api/users/login
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        console.log("From the loginUser!");
        debugger;
        return {
          url: "/users/login",
          method: "POST",
          body,
        };
      },
    }),
    registerUser: builder.mutation({
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

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// // import { LoginInput } from '../../pages/login.page';
// // import { RegisterInput } from '../../pages/register.page';
// import { IGenericResponse } from "../api/types";
// import { userApi } from "./userApi";

// // const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;
// const BASE_URL = "http://localhost:5000";

// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({
//     // baseUrl: `${BASE_URL}/api/auth/`,
//     baseUrl: `${BASE_URL}/api/users/register`,
//   }),
//   endpoints: (builder) => ({
//     registerUser: builder.mutation<IGenericResponse, any>({
//       query(data) {
//         return {
//           url: "register",
//           method: "POST",
//           body: data,
//         };
//       },
//     }),
//     loginUser: builder.mutation<{ access_token: string; status: string }, any>({
//       query(data) {
//         return {
//           url: "login",
//           method: "POST",
//           body: data,
//           credentials: "include",
//         };
//       },
//       // async onQueryStarted(args, { dispatch, queryFulfilled }) {
//       //   try {
//       //     await queryFulfilled;
//       //     await dispatch(userApi.endpoints.getUser.initiate(null));
//       //   } catch (error) {}
//       // },
//     }),
//     // verifyEmail: builder.mutation<
//     //   IGenericResponse,
//     //   { verificationCode: string }
//     // >({
//     //   query({ verificationCode }) {
//     //     return {
//     //       url: `verifyemail/${verificationCode}`,
//     //       method: "GET",
//     //     };
//     //   },
//     // }),
//     logoutUser: builder.mutation<void, void>({
//       query() {
//         return {
//           url: "logout",
//           credentials: "include",
//         };
//       },
//     }),
//   }),
// });

// export const {
//   useLoginUserMutation,
//   useRegisterUserMutation,
//   useLogoutUserMutation,
//   // useVerifyEmailMutation,
// } = authApi;

// import { MetadataObj } from "../../../types/globalTypes";
// import { apiSlice } from "../../app/api/apiSlice";
// import { logOut } from "./authSlice";

// export const authApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (credentials: MetadataObj) => ({
//         url: "/signin",
//         method: "POST",
//         body: { ...credentials },
//       }),
//     }),
//     sendLogout: builder.mutation({
//       query: () => ({
//         url: "/logout",
//         method: "POST",
//       }),
//       async onQueryStarted(arg, { dispatch, queryFulfilled }) {
//         try {
//           await queryFulfilled;
//           dispatch(logOut(null));
//           dispatch(apiSlice.util.resetApiState());
//         } catch (err) {
//           console.log(err);
//         }
//       },
//     }),
//   }),
// });

// export const { useLoginMutation, useSendLogoutMutation } = authApiSlice;
