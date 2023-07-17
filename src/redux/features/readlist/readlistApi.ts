import { api } from "@/redux/apiSlice.ts/apiSlice";
import { IResponse, IReadList } from "@/types/globalTypes";

const readlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addReadList: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `/read-list/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["readlist"],
    }),
    getReadList: builder.query<IResponse<IReadList[]>, string>({
      query: () =>({
        url:  `/read-list`,
      }),
      providesTags: ["readlist"],
     
    }),
  }),
});

export const { useGetReadListQuery, useAddReadListMutation } = readlistApi;
