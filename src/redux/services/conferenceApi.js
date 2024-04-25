import { api } from '../slices/apiSlice';

export const conferenceApi = api.injectEndpoints({
  tagTypes: ['Conference'],
  endpoints: (builder) => ({
    createConference: builder.mutation({
      query: (newsData) => ({
        url: '/conferences',
        method: 'POST',
        body: newsData,
      }),
      invalidatesTags: ['Conference'],
    }),
    getAllConferences: builder.query({
      query: () => ({
        url: '/conferences',
        method: 'GET',
      }),
      providesTags: ['Conference'],
    }),
    getConferenceById: builder.query({
      query: (id) => ({
        url: `/conferences/${id}`,
        method: 'GET',
      }),
    }),
    editConference: builder.mutation({
      query: (id) => ({
        url: `/conferences/${id}`,
        method: 'DELETE',
      }),
    }),
    deleteConference: builder.mutation({
      query: (id) => ({
        url: `/conferences/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateConferenceMutation,
  useDeleteConferenceMutation,
  useGetConferenceByIdQuery,
  useEditConferenceMutation,
  useGetAllConferencesQuery,
} = conferenceApi;

export const {
  endpoints: { createConference, getAllConferences, getConferenceById, deleteConference },
} = conferenceApi;
