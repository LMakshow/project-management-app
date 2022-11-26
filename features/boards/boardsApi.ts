import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { SERVER } from '../../utils/constants'
import {
  BoardRequest,
  BoardResponse,
  ColumnOrderRequest,
  ColumnRequest,
  ColumnResponse,
  CreateColumnRequest,
  CreateTaskRequest,
  CustomError,
  TaskOrderRequest,
  TaskRequest,
  TaskResponse,
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
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  tagTypes: ['BoardList', 'ColumnList', 'TaskList'],
  endpoints: (builder) => ({
    // Boards
    getSingleBoard: builder.query<BoardResponse, string>({
      query: (boardId) => `/boards/${boardId}`,
      providesTags: ['BoardList'],
    }),
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
    changeColumnOrder: builder.mutation<ColumnResponse[], ColumnOrderRequest[]>(
      {
        query: (payload) => ({
          url: `/columnsSet`,
          method: 'PATCH',
          body: payload,
        }),
        invalidatesTags: ['ColumnList'],
      }
    ),
    deleteColumn: builder.mutation<BoardResponse, ColumnRequest>({
      query: ({ boardId, columnId }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ColumnList'],
    }),

    // Tasks
    getTasks: builder.query<TaskResponse[], string>({
      query: (boardId) => `/tasksSet/${boardId}`,
      providesTags: ['TaskList'],
    }),
    createTask: builder.mutation<TaskResponse, CreateTaskRequest>({
      query: ({
        boardId,
        columnId,
        title,
        order,
        description,
        userId,
        users,
      }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body: { title, order, description, userId, users },
      }),
      invalidatesTags: ['TaskList'],
    }),
    updateTask: builder.mutation<TaskResponse, CreateTaskRequest>({
      query: ({
        boardId,
        columnId: prevColumnId,
        newColumnId: columnId,
        taskId,
        title,
        order,
        description,
        userId,
        users,
      }) => ({
        url: `/boards/${boardId}/columns/${prevColumnId}/tasks/${taskId}`,
        method: 'PUT',
        body: { title, order, description, columnId, userId, users },
      }),
      invalidatesTags: ['TaskList'],
    }),
    changeTaskOrder: builder.mutation<TaskResponse[], TaskOrderRequest[]>({
      query: (payload) => ({
        url: `/tasksSet`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['TaskList'],
    }),
    deleteTask: builder.mutation<TaskResponse, TaskRequest>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TaskList'],
    }),
    searchTask: builder.mutation<TaskResponse[], string>({
      query: (filterText) => ({
        url: `/tasksSet?search=${filterText}`,
        method: 'GET',
      }),
    }),
    getBoardsSet: builder.mutation<BoardResponse[], string>({
      query: (str) => ({
        url: `/boardsSet?ids=${str}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetSingleBoardQuery,
  useGetBoardsQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,

  useGetColumnsQuery,
  useCreateColumnMutation,
  useUpdateColumnMutation,
  useDeleteColumnMutation,
  useChangeColumnOrderMutation,

  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,

  useSearchTaskMutation,
  useGetBoardsSetMutation,
} = boardsApi