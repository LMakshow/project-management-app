import { configureStore } from '@reduxjs/toolkit'
import userReducer from './auth/userSlice'
import { authApi } from './auth/authApi'
import { boardsApi } from './boards/boardsApi'
import { profileApi } from './profileApi'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [boardsApi.reducerPath]: boardsApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      boardsApi.middleware,
      profileApi.middleware,
    ]),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
