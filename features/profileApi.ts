import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SERVER } from '../components/core/Utilities/constants'
import { UserEdit, UserEditResponse } from '../components/core/Utilities/interfaces'
import { RootState } from './store'

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).user.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    editProfile: builder.mutation<UserEditResponse, UserEdit>({
      query: ({ _id, ...data }) => ({
        url: `users/${_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteProfile: builder.mutation<UserEditResponse, string>({
      query: (_id) => ({
        url: `users/${_id}`,
        method: 'DELETE',
        body: {},
      }),
    }),
  }),
})

export const { useEditProfileMutation, useDeleteProfileMutation } = profileApi
