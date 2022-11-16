import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SERVER } from '../../utils/constants'
import {
  BoardRequest,
  BoardResponse,
  UserSignIn,
  UserSignInResponse,
  UserSignUp,
  UserSignUpResponse,
} from '../../utils/interfaces'
import { RootState } from '../store'

export const boardsApi = createApi({
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
    createBoard: builder.mutation<BoardResponse, BoardRequest>({
      query: (params) => ({
        url: 'boards',
        method: 'POST',
        body: params,
      }),
    }),
    updateBoard: builder.mutation<BoardResponse, BoardResponse>({
      query: ({ _id, title, owner, users }) => ({
        url: `boards/${_id}`,
        method: 'PUT',
        body: { title, owner, users },
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

export const { useCreateBoardMutation, useUpdateBoardMutation } = boardsApi
