import { api } from '../slices/apiSlice';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
    }),
    updateUser: builder.mutation({
      query: ({ userData, id }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: userData,
      }),
    }),
  }),
});

export const { useGetUserByIdQuery, useLazyGetUserByIdQuery, useUpdateUserMutation } = userApi;

export const {
  endpoints: { getUserById, updateUser },
} = userApi;
