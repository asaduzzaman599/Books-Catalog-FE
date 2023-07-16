import { api } from "@/redux/apiSlice.ts/apiSlice"
import { ILoginInput, ILoginResponse, IResponse, ISignupInput, IUser } from "@/types/globalTypes"


const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IResponse<ILoginResponse>, { data: ILoginInput}>({
      query: ({  data }: { data: ILoginInput}) => ({
        url: `/auth/login`,
        method: 'POST',
        body: data,
      }),
    }),
    signup: builder.mutation<IResponse<IUser>, { data: ISignupInput}>({
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