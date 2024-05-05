import { api } from '../slices/apiSlice';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ _id, ...userData }) => ({
        url: `/users/${_id}`,
        method: 'PATCH',
        body: userData,
      }),
      invalidatesTags: ['User'],
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
