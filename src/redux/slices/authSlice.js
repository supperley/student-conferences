import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  isAuthenticated:
    localStorage.getItem('user') || process.env.VERCEL_ENV === 'preview' ? true : false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addMatcher(authApi.endpoints.current.matchFulfilled, (state, action) => {
        state.isAuthenticated = true;
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem('user');
      });
  },
});

export default slice.reducer;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export const selectCurrent = (state) => state.auth.current;

export const selectUser = (state) => state.auth.user;
