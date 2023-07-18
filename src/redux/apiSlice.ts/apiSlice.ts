
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://book-catalog-store-be.vercel.app/api/v1/' ,
    prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.token

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', token)
    }

    return headers
  },
  }),
  tagTypes: ['books','comments','wishlist','readlist', 'filter'],
  endpoints: () => ({}),
})