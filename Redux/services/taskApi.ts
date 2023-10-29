import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type TaskData = {
  completed: boolean
  id: number
  title: string
  userId: number
}

export const taskApiService = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getTaskList: builder.query<TaskData, string>({
      query: (id) => `tasks/${id}`,
    })
  }),
})

export const { useGetTaskListQuery } = taskApiService