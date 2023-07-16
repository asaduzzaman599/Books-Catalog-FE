import { api } from "@/redux/apiSlice.ts/apiSlice";
import { IBook, IResponse } from "@/types/globalTypes";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<IResponse<IBook[]>, string>({
      query: (query) => `books/`,
      providesTags: ["books"],
    }),
    delete: builder.mutation({
      query: ({ id, token }: { id: string, token: string }) => ({
        url: `/books/${id}`,
        method: "DELETE",
        headers: { authorization: token },
      }),
      invalidatesTags: ["books"],
    }),
    update: builder.mutation({
      query: ({ id, data, token }: { id: string, data: Partial<IBook> , token: string }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        headers: { authorization: token },
        body: data
      }),
    }),
    create: builder.mutation({
      query: ({  data, token }: { data: Partial<IBook>,  token: string  }) => ({
        url: `/books/create-book`,
        method: "POST",
        headers: { authorization: token },
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
