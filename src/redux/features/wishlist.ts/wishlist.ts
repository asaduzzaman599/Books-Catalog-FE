import { api } from "@/redux/apiSlice.ts/apiSlice";
import { IResponse, IWishList } from "@/types/globalTypes";

const wishlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addWishList: builder.mutation({
      query: ({ id }: { id: string}) => ({
        url: `/wish-list/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["wishlist"],
    }),
    getWishList: builder.query<IResponse<IWishList[]>, string>({
      query: () =>({
        url:  `/wish-list`,
      }),
      providesTags: ["wishlist"],
     
    }),
  }),
});

export const { useGetWishListQuery, useAddWishListMutation } = wishlistApi;
