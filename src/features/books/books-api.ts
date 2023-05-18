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
        console.log(formData.get("image"));

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
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useGetUserBooksQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useUploadImgMutation,
} = booksApi;
