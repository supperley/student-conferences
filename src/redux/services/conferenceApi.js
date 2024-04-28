import { api } from '../slices/apiSlice';

export const conferenceApi = api.injectEndpoints({
  tagTypes: ['Conference'],
  endpoints: (builder) => ({
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
      providesTags: ['Conference'],
    }),
    createConference: builder.mutation({
      query: (conferenceData) => ({
        url: '/conferences',
        method: 'POST',
        body: conferenceData,
      }),
      invalidatesTags: ['Conference'],
    }),
    updateConference: builder.mutation({
      query: ({ id, conferenceData }) => ({
        url: `/conferences/${id}`,
        method: 'PATCH',
        body: conferenceData,
      }),
      invalidatesTags: ['Conference'],
    }),
    // deleteConference: builder.mutation({
    //   query: (id) => ({
    //     url: `/conferences/${id}`,
    //     method: 'DELETE',
    //   }),
    // }),
  }),
});

export const {
  useCreateConferenceMutation,
  useGetAllConferencesQuery,
  useGetConferenceByIdQuery,
  useUpdateConferenceMutation,
  // useDeleteConferenceMutation,
} = conferenceApi;

export const {
  endpoints: { createConference, getAllConferences, getConferenceById, deleteConference },
} = conferenceApi;
