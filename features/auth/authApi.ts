import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SERVER } from '../../utils/constants'
import { UserSignIn, UserSignInResponse, UserSignUp, UserSignUpResponse } from '../../utils/interfaces'
import { RootState } from '../store'

export const authApi = createApi({
  reducerPath: 'authApi',
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
    signIn: builder.mutation<UserSignInResponse, UserSignIn>({
      query: (credentials) => ({
        url: 'auth/signin',
        method: 'POST',
        body: credentials,
      }),
    }),
    signUp: builder.mutation<UserSignUpResponse, UserSignUp>({
      query: (credentials) => ({
        url: 'auth/signup',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

export const { useSignInMutation, useSignUpMutation } = authApi
