import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SERVER } from '../../utils/constants'
import { BoardRequest, BoardResponse } from '../../utils/interfaces'
import { RootState } from '../store'

export const boardsApi = createApi({
  reducerPath: 'boardsApi',
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
  tagTypes: ['BoardList'],
  endpoints: (builder) => ({
    getBoards: builder.query<BoardResponse[], string>({
      query: (userId) => `/boardsSet/${userId}`,
      providesTags: ['BoardList'],
    }),
    createBoard: builder.mutation<BoardResponse, BoardRequest>({
      query: (payload) => ({
        url: 'boards',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['BoardList'],
    }),
    updateBoard: builder.mutation<BoardResponse, BoardResponse>({
      query: ({ _id, title, owner, users }) => ({
        url: `boards/${_id}`,
        method: 'PUT',
        body: { title, owner, users },
      }),
      invalidatesTags: ['BoardList'],
    }),
    deleteBoard: builder.mutation<BoardResponse, BoardResponse>({
      query: ({ _id, title, owner, users }) => ({
        url: `boards/${_id}`,
        method: 'DELETE',
        body: { title, owner, users },
      }),
      invalidatesTags: ['BoardList'],
    }),
  }),
})

export const { useGetBoardsQuery, useCreateBoardMutation, useUpdateBoardMutation, useDeleteBoardMutation } = boardsApi
