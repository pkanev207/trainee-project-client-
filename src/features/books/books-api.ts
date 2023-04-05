import { apiSlice } from "../api/api-slice";
import { useSelector } from "react-redux";
import { selectAuth } from "../auth/auth-slice";

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
      query: (book) => {
        return {
          url: "/books",
          method: "POST",
          body: book,
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
      query: (book) => {
        console.log("From the query:");
        console.log(book);

        return {
          url: `/books/${book._id}`,
          method: "DELETE",
          body: book._id,
          prepareHeaders: (
            headers: Headers,
            api: { getState: () => unknown }
          ) => {
            headers.set("Authorization", `Bearer ${book.token}`);
            return headers;
          },
          credentials: "include",
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
