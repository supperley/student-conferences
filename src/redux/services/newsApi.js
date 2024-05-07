import { api } from '../slices/apiSlice';

export const newsApi = api.injectEndpoints({
  tagTypes: ['News'],
  endpoints: (builder) => ({
    getAllNews: builder.query({
      query: () => ({
        url: '/news',
        method: 'GET',
      }),
      providesTags: ['News'],
    }),
    getNewsById: builder.query({
      query: (id) => ({
        url: `/news/${id}`,
        method: 'GET',
      }),
      providesTags: ['News'],
    }),
    createNews: builder.mutation({
      query: (newsData) => ({
        url: '/news',
        method: 'POST',
        body: newsData,
      }),
      invalidatesTags: ['News'],
    }),
    updateNews: builder.mutation({
      query: ({ id, newsData }) => ({
        url: `/news/${id}`,
        method: 'PATCH',
        body: newsData,
      }),
      invalidatesTags: ['News'],
    }),
    deleteNews: builder.mutation({
      query: (id) => ({
        url: `/news/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['News'],
    }),
  }),
});

export const {
  useCreateNewsMutation,
  useGetAllNewsQuery,
  useGetNewsByIdQuery,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
  useLazyGetAllNewsQuery,
  useLazyGetNewsByIdQuery,
} = newsApi;

export const {
  endpoints: { createNews, getAllNews, getNewsById, deleteNews },
} = newsApi;
