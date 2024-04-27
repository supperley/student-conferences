import { api } from '../slices/apiSlice';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: 'GET',
      }),
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
    }),
    updateUser: builder.mutation({
      query: ({ userData, id }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: userData,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserMutation,
} = userApi;

export const {
  endpoints: { getUserById, updateUser },
} = userApi;
