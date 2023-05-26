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
    getAllBooksPaginated: builder.query<
      any,
      { page: number | string; limit?: number | string; searchTerm?: string }
    >({
      query: (args) => {
        const { page, limit, searchTerm } = args;
        return {
          url: `/books/paginated?page=${page}&limit=${limit}&query=${searchTerm}`,
          // params: { page, limit },
          method: "GET",
        };
      },
      // transformResponse: () => {},
    }),
    getBookById: builder.query({
      query: (bookId) => {
        return {
          url: `/books/${bookId}`,
          method: "GET",
        };
      },
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
    uploadImg: builder.mutation({
      query: ({ formData, token }) => {
        return {
          url: "/books/images/upload",
          method: "POST",
          body: formData,
          formData: true,
          headers: {
            // "content-type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
        };
      },
      // transformResponse: () => {},
      invalidatesTags: [],
    }),
    createBook: builder.mutation({
      query: ({ book, token }) => {
        return {
          url: "/books",
          method: "POST",
          body: book,
          formData: true,
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
      // transformResponse: () => {},
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: ({ book, token }) => {
        return {
          url: `/books/${book.get("_id")}`,
          method: "PUT",
          body: book,
          formData: true,
          headers: {
            authorization: `Bearer ${token}`,
          },
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
    searchBookByTitle: builder.query({
      query: (title) => `books/search/${title}`,
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetAllBooksPaginatedQuery,
  useGetBookByIdQuery,
  useGetUserBooksQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useUploadImgMutation,
} = booksApi;
