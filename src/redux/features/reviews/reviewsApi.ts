import { api } from "@/redux/apiSlice.ts/apiSlice"
import { IResponse, IReview } from "@/types/globalTypes"


const reviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postComment: builder.mutation({
      query: ({ data }: {id: string, data: Partial<IReview>}) => ({
        url: `/reviews`,
        method: 'POST',
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
 useGetReviewsQuery,
 usePostCommentMutation
} = reviewApi;