import { api } from "@/redux/apiSlice.ts/apiSlice"
import { ILoginInput, IResponse, ISignupInput } from "@/types/globalTypes"


const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({  data }: { data: ILoginInput}) => ({
        url: `/auth/login`,
        method: 'POST',
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: ({  data }: { data: ISignupInput}) => ({
        url: `/auth/signup`,
        method: 'POST',
        body: data,
      }),
    }),
    getLoggedInUser: builder.query({
      query: (token:string) => ({
        url: `/users`,
        headers: { authorization: token },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetLoggedInUserQuery
} = authApi;