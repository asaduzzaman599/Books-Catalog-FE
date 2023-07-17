import { api } from "@/redux/apiSlice.ts/apiSlice";
import { IBook, IResponse } from "@/types/globalTypes";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<IResponse<IBook[]>, string>({
      query: (query) => `books/`,
      providesTags: ["books"],
    }),
    delete: builder.mutation({
      query: ({ id }: { id: string,}) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
    update: builder.mutation({
      query: ({ id, data }: { id: string, data: Partial<IBook>  }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data
      }),
    }),
    create: builder.mutation({
      query: ({  data }: { data: Partial<IBook>}) => ({
        url: `/books/create-book`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["books"],
    }),
    getBook: builder.query<IResponse<IBook>,string>({
      query: (id: string) => ({
        url: `/books/${id}`,
      }),
    }),
  }),
});

export const { useGetBooksQuery, useDeleteMutation, useUpdateMutation, useGetBookQuery, useCreateMutation } = bookApi;
