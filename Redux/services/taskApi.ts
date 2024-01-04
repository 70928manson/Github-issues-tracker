import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//Temp
type Issue = {
  id: number;
  title: string;
  body: string;
  time: string;
  created_at: string;
  status: string;
  state: string;
};

export const taskApiService = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/repos/70928manson/Github-issues-tracker' }),
  endpoints: (builder) => ({
    getTaskList: builder.query<Issue[], number | "all">({
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