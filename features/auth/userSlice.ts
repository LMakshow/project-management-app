import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

type AuthState = {
  _id: string | null
  name: string | null
  login: string | null
  token: string | null
}

const slice = createSlice({
  name: 'user',
  initialState: {
    _id: null,
    name: null,
    login: null,
    token: null,
  } as AuthState,
  reducers: {
    setUser: (state, { payload: { token, _id, name, login } }) => {
      state.token = token
      state._id = _id,
      state.name = name,
      state.login = login
    },
  },
})

export const { setUser } = slice.actions

export default slice.reducer
