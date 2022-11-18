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
  owner: string
  users: string[]
}
