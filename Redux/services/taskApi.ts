import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type TaskData = {
  completed: boolean
  id: number
  title: string
  userId: number
}

export const taskApiService = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/repos/70928manson/Github-issues-tracker' }),
  endpoints: (builder) => ({
    getTaskList: builder.query<any, number | "all">({  //task -> any
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