import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../shared/config/constants';

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

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
