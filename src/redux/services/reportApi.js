import { api } from '../slices/apiSlice';

export const reportApi = api.injectEndpoints({
  tagTypes: ['Report'],
  endpoints: (builder) => ({
    getAllReports: builder.query({
      query: () => ({
        url: '/reports',
        method: 'GET',
      }),
      providesTags: ['Report'],
    }),
    getReportById: builder.query({
      query: (id) => ({
        url: `/reports/${id}`,
        method: 'GET',
      }),
      providesTags: ['Report'],
    }),
    createReport: builder.mutation({
      query: (reportData) => ({
        url: '/reports',
        method: 'POST',
        body: reportData,
      }),
      invalidatesTags: ['Report'],
    }),
    updateReport: builder.mutation({
      query: ({ id, reportData }) => ({
        url: `/reports/${id}`,
        method: 'PATCH',
        body: reportData,
      }),
      invalidatesTags: ['Report'],
    }),
    // deleteReport: builder.mutation({
    //   query: (id) => ({
    //     url: `/reports/${id}`,
    //     method: 'DELETE',
    //   }),
    // }),
  }),
});

export const {
  useCreateReportMutation,
  useGetAllReportsQuery,
  useGetReportByIdQuery,
  useUpdateReportMutation,
  // useDeleteReportMutation,
} = reportApi;

export const {
  endpoints: { createReport, getAllReports, getReportById, deleteReport },
} = reportApi;
