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



