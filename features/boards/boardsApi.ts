import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SERVER } from '../../utils/constants'
import {
  BoardRequest,
  BoardResponse,
  ColumnOrderRequest,
  ColumnRequest,
  ColumnResponse,
  CreateColumnRequest,
} from '../../utils/interfaces'
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
  tagTypes: ['BoardList', 'ColumnList'],
  endpoints: (builder) => ({
    // Boards
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
      query: ({ _id, title, description, owner, users }) => ({
        url: `boards/${_id}`,
        method: 'PUT',
        body: { title, description, owner, users },
      }),
      invalidatesTags: ['BoardList'],
    }),
    deleteBoard: builder.mutation<BoardResponse, string>({
      query: (boardId) => ({
        url: `boards/${boardId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BoardList'],
    }),

    // Columns
    getColumns: builder.query<ColumnResponse[], string>({
      query: (boardId) => `/boards/${boardId}/columns`,
      providesTags: ['ColumnList'],
    }),
    createColumn: builder.mutation<ColumnResponse, CreateColumnRequest>({
      query: ({ boardId, title, order }) => ({
        url: `/boards/${boardId}/columns`,
        method: 'POST',
        body: { title, order },
      }),
      invalidatesTags: ['ColumnList'],
    }),
    updateColumn: builder.mutation<ColumnResponse, CreateColumnRequest>({
      query: ({ boardId, columnId, title, order }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'PUT',
        body: { title, order },
      }),
      invalidatesTags: ['ColumnList'],
    }),
    changeColumnOrder: builder.mutation<ColumnResponse[], ColumnOrderRequest[]>({
      query: (payload) => ({
        url: `/columnsSet`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['ColumnList'],
    }),
    deleteColumn: builder.mutation<BoardResponse, ColumnRequest>({
      query: ({ boardId, columnId }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ColumnList'],
    }),
  }),
})

export const {
  useGetBoardsQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,

  useGetColumnsQuery,
  useCreateColumnMutation,
  useUpdateColumnMutation,
  useDeleteColumnMutation,
} = boardsApi
