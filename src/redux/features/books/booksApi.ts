import { api } from "@/redux/apiSlice.ts/apiSlice"
import { IBooks, IResponse } from "@/types/globalTypes"


const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<IResponse<IBooks[]>, string>({
      query: (query) => `books/`,
      providesTags: ['books'],
    }),
  }),
});

export const {
 useGetBooksQuery
} = bookApi;