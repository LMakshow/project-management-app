import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
// import { apiSlice } from './apiSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    // [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
