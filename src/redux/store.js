import { configureStore } from '@reduxjs/toolkit';
import { listenerAuthTokenMiddleware } from './middleware/auth';
import { api } from './slices/apiSlice';
import auth from './slices/authSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).prepend(listenerAuthTokenMiddleware.middleware),
});
