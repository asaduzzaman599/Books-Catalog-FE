import { api } from "@/redux/apiSlice.ts/apiSlice";
import { IBook, IBookQueryType, IResponse } from "@/types/globalTypes";
import { url } from "inspector"

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<IResponse<IBook[]>, IBookQueryType>({
      query: (query: IBookQueryType) => {
        let url = `books`

        const queryArr = []
        
        for(const key in query){
          if(query[key as keyof IBookQueryType]){
            const tempQuery = query[key  as keyof IBookQueryType]
            if(tempQuery)
            queryArr.push(`${key}=${tempQuery}`)
          }
        }
        console.log('queryfor',queryArr)
        
     
        if(queryArr.length){
          url = `${url}?${queryArr.join('&')}`
        }
        console.log('url',url)
        
        return {
          url: url
        }
      },
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
