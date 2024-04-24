import { api } from '../slices/apiSlice';

export const conferenceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createConference: builder.mutation({
      query: (newsData) => ({
        url: '/conferences',
        method: 'POST',
        body: newsData,
      }),
    }),
    getAllConferences: builder.query({
      query: () => ({
        url: '/conferences',
        method: 'GET',
      }),
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
