import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITask } from '../slices/taskSlice';

export const taskApiService = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/repos/70928manson/Github-issues-tracker' }),
  endpoints: (builder) => ({
    getTaskList: builder.query<ITask[], number | "all">({
      query: (id) => {
        if (id !== "all") {
          return `issues/${id}`
        }
        return `issues`;
      },
    }),
  }),
})

export const { useGetTaskListQuery } = taskApiService