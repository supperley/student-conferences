import { createListenerMiddleware } from '@reduxjs/toolkit';
import { userApi } from '../services/userApi';

export const listenerAuthMiddleware = createListenerMiddleware();

listenerAuthMiddleware.startListening({
  matcher: userApi.endpoints.login.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (action.payload.token) {
      localStorage.setItem('token', action.payload.token);
    }
  },
});
