import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

type AuthState = {
  _id: string | null
  name: string | null
  login: string | null
  token: string | null
  password: string | null
}

const slice = createSlice({
  name: 'user',
  initialState: {
    _id: null,
    name: null,
    login: null,
    token: null,
    password: null,
  } as AuthState,
  reducers: {
    setUser: (state, { payload: { token, _id, name, login, password } }) => {
      state.token = token
      state._id = _id
      state.name = name
      state.login = login
      state.password = password
    },
  },
})

export const { setUser } = slice.actions

export default slice.reducer
