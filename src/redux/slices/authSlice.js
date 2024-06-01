import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  isAuthenticated: localStorage.getItem('user') ? true : false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addMatcher(authApi.endpoints.current.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addMatcher(authApi.endpoints.logout.matchPending, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem('user');
      });
  },
});

export default slice.reducer;

export const { logout } = slice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsBlocked = (state) => state.auth.user?.status === 'blocked';
export const selectIsAdmin = (state) => state.auth.user?.role === 'admin';
export const selectIsModerator = (state) => state.auth.user?.role === 'moderator';
export const selectIsPrivileged = (state) =>
  state.auth.user?.role === 'admin' || state.auth.user?.role === 'moderator';

export const selectCurrent = (state) => state.auth.current;

export const selectUser = (state) => state.auth.user;
