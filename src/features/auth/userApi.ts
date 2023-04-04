export {};

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { setUser } from "./userSlice";
// import { IUser } from "../api/types";

// const BASE_URL = "http://localhost:3000";

// export const userApi = createApi({
//   reducerPath: "userApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: `${BASE_URL}/api/users/register`,
//   }),
//   tagTypes: ["User"],
//   endpoints: (builder) => ({
//     getUser: builder.query<IUser, null>({
//       query() {
//         return {
//           url: "user",
//           credentials: "include",
//         };
//       },
//       transformResponse: (result: { data: { user: IUser } }) => {
//         return result.data.user;
//       },
//       async onQueryStarted(args, { dispatch, queryFulfilled }) {
//         try {
//           const { data } = await queryFulfilled;
//           dispatch(setUser(data));
//         } catch (error) {
//           console.log(error);
//         }
//       },
//     }),
//   }),
// });
