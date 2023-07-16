import { api } from "@/redux/apiSlice.ts/apiSlice";
import { IResponse, IWishList } from "@/types/globalTypes";

const wishlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addWishList: builder.mutation({
      query: ({ id, token }: { id: string; token: string }) => ({
        url: `/wish-list/${id}`,
        method: "PUT",
        headers: { authorization: token },
      }),
      invalidatesTags: ["wishlist"],
    }),
    getWishList: builder.query<IResponse<IWishList[]>, string>({
      query: (token) =>({
        url:  `/wish-list`,
        headers: { authorization: token },
      }),
      providesTags: ["wishlist"],
     
    }),
  }),
});

export const { useGetWishListQuery, useAddWishListMutation } = wishlistApi;
