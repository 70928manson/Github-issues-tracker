import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IIssue } from '../slices/issueSlice';

export const issueApiService = createApi({
  reducerPath: 'issueApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/repos/70928manson/Github-issues-tracker' }),
  endpoints: (builder) => ({
    getIssueList: builder.query<IIssue[], number | "all">({
      query: (id) => {
        if (id !== "all") {
          return `issues/${id}`
        }
        return `issues`;
      },
    }),
  }),
})

export const { useGetIssueListQuery } = issueApiService