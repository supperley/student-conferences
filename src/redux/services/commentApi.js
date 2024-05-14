import { api } from '../slices/apiSlice';

export const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCommentById: builder.query({
      query: (id) => ({
        url: `/comments/${id}`,
        method: 'GET',
      }),
    }),
    updateComment: builder.mutation({
      query: ({ id, commentData }) => ({
        url: `/comments/${id}`,
        method: 'PATCH',
        body: commentData,
      }),
      invalidatesTags: ['Report'],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Report'],
    }),
  }),
});

export const { useDeleteCommentMutation, useUpdateCommentMutation } = commentApi;
