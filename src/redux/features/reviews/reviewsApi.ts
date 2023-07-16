import { api } from "@/redux/apiSlice.ts/apiSlice"
import { IResponse, IReview } from "@/types/globalTypes"


const reviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postComment: builder.mutation({
      query: ({ id, data, token }: {id: string, data: Partial<IReview>, token: string}) => ({
        url: `/reviews/${id}`,
        method: 'POST',
        headers: { authorization: token },
        body: data,
      }),
      invalidatesTags: ['comments'],
    }),
    getReviews: builder.query<IResponse<IReview[]>, string>({
      query: (id) => `reviews/${id}`,
      providesTags: ['comments'],
    }),
  }),
});

export const {
 useGetReviewsQuery
} = reviewApi;