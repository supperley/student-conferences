import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../shared/config/constants';
import { logout } from './authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api`,
  // prepareHeaders: (headers, { getState }) => {
  //   const token = getState().auth.token || localStorage.getItem('token');

  //   if (token) {
  //     headers.set('authorization', `Bearer ${token}`);
  //   }

  //   return headers;
  // },
  credentials: 'include',
});

// const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Если статус 401, инициируем выход из аккаунта
  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }

  return result;
};

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQueryWithReauth,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
