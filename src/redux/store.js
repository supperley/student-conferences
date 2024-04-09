import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import auth from './slices/userSlice';
import { listenerMiddleware } from './middleware/auth';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware).prepend(listenerMiddleware.middleware),
});
