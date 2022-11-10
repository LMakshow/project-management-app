import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isSigned: false,
  lang: 'EN' as 'EN' | 'RU',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state) => {
      state.isSigned = true
    },
    signOut: (state) => {
      state.isSigned = false
    },
    changeLang: (state, action) => {
      state.lang = action.payload
    },
  },
})

export const { signIn, signOut, changeLang } = userSlice.actions;

export default userSlice.reducer
