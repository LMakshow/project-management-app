import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SERVER } from '../utils/constants'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER }),
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => '/posts'
    })
  })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetPostsQuery } = apiSlice