import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isSigned: false,
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
    }
  },
})

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer
