import { createSlice } from "@reduxjs/toolkit";

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
    taskList: [],
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        localStorageInitTask: (state, action) => {
            state.taskList = action.payload;
        },
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
        deleteTask: (state, action) => {
            const taskList = window.localStorage.getItem('taskList');
            if (taskList) {
                const taskListArr = JSON.parse(taskList);
                taskListArr.forEach((task: ITask, index: number) => {
                if (task.id === action.payload) {
                    taskListArr.splice(index, 1);
                }
                });
                window.localStorage.setItem('taskList', JSON.stringify(taskListArr));
                state.taskList = taskListArr;
            }
        },
        updateFilterStatus: (state, action) => {
            state.filterStatus = action.payload;
        },
    }
})

export const { localStorageInitTask, addTask, updateTask, deleteTask, updateFilterStatus } = taskSlice.actions;

export default taskSlice.reducer;