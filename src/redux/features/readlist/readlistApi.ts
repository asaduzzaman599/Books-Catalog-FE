import { api } from "@/redux/apiSlice.ts/apiSlice";
import { IResponse, IReadList } from "@/types/globalTypes";

const readlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addReadList: builder.mutation({
      query: ({ id, token }: { id: string; token: string }) => ({
        url: `/read-list/${id}`,
        method: "PUT",
        headers: { authorization: token },
      }),
      invalidatesTags: ["readlist"],
    }),
    getReadList: builder.query<IResponse<IReadList[]>, string>({
      query: (token) =>({
        url:  `/read-list`,
        headers: { authorization: token },
      }),
      providesTags: ["readlist"],
     
    }),
  }),
});

export const { useGetReadListQuery, useAddReadListMutation } = readlistApi;
