'use-client';

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const getInitialTask = () => {
  // getting task list
  const localTaskList = window.localStorage.getItem('taskList');
  // if task list is not empty
  if (localTaskList) {
    return JSON.parse(localTaskList);
  }

  window.localStorage.setItem('taskList', JSON.stringify([]));
  return [];
};

export interface ITask {
    id: string;
    title: string;
    status: string;
    time: string;
}

export interface ITaskState {
    value: number;
    filterStatus: string;
    taskList: ITask[];
}

const initialState: ITaskState = {
    value: 0,
    filterStatus: 'all',
    taskList: getInitialTask(),
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.taskList.push(action.payload);
            const taskList = window.localStorage.getItem('taskList');
            if (taskList) {
                const taskListArr = JSON.parse(taskList);
                taskListArr.push({
                  ...action.payload,
                });
                window.localStorage.setItem('taskList', JSON.stringify(taskListArr));
            } else {
                window.localStorage.setItem(
                  'taskList',
                  JSON.stringify([
                    {
                      ...action.payload,
                    },
                  ])
                );
            }
        },
        updateTask: (state, action) => {
            const taskList = window.localStorage.getItem('taskList');
            if (taskList) {
                const taskListArr = JSON.parse(taskList);
                taskListArr.forEach((task: ITask) => {  
                if (task.id === action.payload.id) {
                    task.status = action.payload.status;
                    task.title = action.payload.title;
                }
                });
                window.localStorage.setItem('taskList', JSON.stringify(taskListArr));
                state.taskList = [...taskListArr];
            }
        },
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
        updateFilterStatus: (state, action) => {
            state.filterStatus = action.payload;
        },
    }
})

export const { addTask, updateTask, increment, decrement, incrementByAmount, updateFilterStatus } = taskSlice.actions;

export default taskSlice.reducer;