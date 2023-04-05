import { apiSlice } from "../api/api-slice";

export const booksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query<any, void>({
      query: () => {
        return {
          url: "/books",
          method: "GET",
        };
      },
      // transformResponse: () => {},
      providesTags: ["Books"],
    }),
    getUserBooks: builder.query({
      query: (body: [{ title: string; _id: string } | null]) => {
        return {
          url: "/books/user",
          method: "GET",
          body,
        };
      },
      // transformResponse: () => {},
      providesTags: ["Books"],
    }),
    createBook: builder.mutation({
      query: ({ book, token }) => {
        console.log("From th query");
        console.log(book);
        console.log(token);
        return {
          url: "/books",
          method: "POST",
          body: book,
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
      // transformResponse: () => {},
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: (book) => {
        return {
          url: `/books/${book._id}`,
          method: "PUT",
          body: book,
        };
      },
      // transformResponse: () => {},
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: ({ book, token }) => {
        return {
          url: `/books/${book._id}`,
          method: "DELETE",
          body: book._id,
          headers: {
            authorization: `Bearer ${token}`,
          },
          // prepareHeaders: (headers: Headers) => {
          //   headers.set("Authorization", `Bearer ${token}`);
          //   return headers;
          // },
          // credentials: "include", // due to CORS
        };
      },
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetUserBooksQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;
