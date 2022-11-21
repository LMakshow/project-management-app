import { UseMutation } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { MutationDefinitionDeleteElement } from './types';

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

export interface UserSignInResponse {
  token: string
  name: string
  login: string
  _id: string
  error: {
    data: { statusCode: number; message: string }
    status: number
  }
}

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

export interface ColumnResponse {
  _id: string
  title: string
  order: number
  boardId: string
}

export interface BoardTitleProps {
  title: string
  handleUpdateBoard: (value: Partial<BoardResponse>) => void
}

export interface BoardDescriptionProps {
  description: string
  handleUpdateBoard: (value: Partial<BoardResponse>) => void
}

export interface DeleteElementPopoverProps {
  id: string
  mutation: UseMutation<MutationDefinitionDeleteElement>
  localeKeys: {
    button: string,
    text: string
  }
}



