import { UseMutation } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import { MutationDefinitionDeleteElement } from './types'

// Sign In
export interface UserSignUp {
  name: string
  login: string
  password: string
}

export interface UserSignUpResponse {
  name: string
  login: string
  _id: string
}

export interface UserSignIn {
  login: string
  password: string
}

export interface CustomError {
  data: { statusCode: number; message: string }
  status: number
}

export interface UserSignInResponse {
  token: string
  name: string
  login: string
  _id: string
  error: Error
}

// Boards
export interface BoardRequest {
  title: string
  description: string
  owner: string
  users: string[]
}

export interface BoardResponse {
  _id: string
  title: string
  description: string
  owner: string
  users: string[]
}

export interface UserEditResponse extends UserSignUpResponse {}
export interface UserEdit extends UserSignUp {
  _id: string
}

// Columns
export interface CreateColumnRequest {
  boardId?: string
  columnId?: string
  title: string
  order: number
}

export interface ColumnRequest {
  boardId: string
  columnId: string
}

export interface ColumnOrderRequest {
  _id: string
  order: number
}

export interface ColumnResponse {
  _id: string
  title: string
  order: number
  boardId: string
}

// Tasks
export interface TaskRequest {
  boardId: string
  columnId: string
  taskId?: string
}

export interface TaskResponse {
  _id: string
  title: string
  order: number
  boardId: string
  columnId: string
  description: string
  userId: string
  users: string[]
}

export interface CreateTaskRequest {
  boardId: string
  columnId: string
  newColumnId?: string
  taskId?: string
  title: string
  order: number
  description: string
  userId: string
  users: string[]
}

export interface TaskOrderRequest {
  _id: string
  order: number
  columnId: string
}

// Mutations
export interface BoardTitleProps {
  setIsEdit: (value: boolean) => void
  isEdit: boolean
  title: string
  handleUpdateBoard: (value: Partial<BoardResponse>) => void
}

export interface BoardDescriptionProps {
  setIsEdit: (value: boolean) => void
  isEdit: boolean
  description: string
  handleUpdateBoard: (value: Partial<BoardResponse>) => void
}

export interface DeleteElementPopoverProps {
  id: string
  mutation: UseMutation<MutationDefinitionDeleteElement>
  localeKeys: {
    button: string
    text: string
  }
}
