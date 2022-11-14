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
}
