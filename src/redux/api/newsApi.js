import { api } from '../slices/apiSlice';

export const newsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createNews: builder.mutation({
      query: (newsData) => ({
        url: '/news',
        method: 'POST',
        body: newsData,
      }),
    }),
    getAllNews: builder.query({
      query: () => ({
        url: '/news',
        method: 'GET',
      }),
    }),
    getNewsById: builder.query({
      query: (id) => ({
        url: `/news/${id}`,
        method: 'GET',
      }),
    }),
    deleteNews: builder.mutation({
      query: (id) => ({
        url: `/news/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateNewsMutation,
  useGetAllNewsQuery,
  useGetNewsByIdQuery,
  useDeleteNewsMutation,
  useLazyGetAllNewsQuery,
  useLazyGetNewsByIdQuery,
} = newsApi;

export const {
  endpoints: { createNews, getAllNews, getNewsById, deleteNews },
} = newsApi;
