import { configureStore } from '@reduxjs/toolkit';
import { api } from './slices/apiSlice';
import auth from './slices/authSlice';
import { listenerAuthMiddleware } from './middleware/auth';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).prepend(listenerAuthMiddleware.middleware),
});
