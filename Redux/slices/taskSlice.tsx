import { createSlice } from "@reduxjs/toolkit";
import { taskApiService } from "../services/taskApi";

//Temp
export interface ITask {
    id: number;
    title: string;
    body: string;
    time: string;
    created_at: string;
    status: string;
    state: string;
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
        initTask: (state, action) => {
            state.taskList = action.payload;
        },
        addTask: (state, action) => {
            state.taskList.push(action.payload);
        },
        updateTask: (state, action) => {
            state.taskList.forEach((task: ITask) => {
                if (task.id === action.payload.id) {
                    task.status = action.payload.status;
                    task.title = action.payload.title;
                }
            });
        },
        deleteTask: (state, action) => {
            state.taskList.forEach((task: ITask, index: number) => {
                if (task.id === action.payload) {
                    state.taskList.splice(index, 1);
                }
            });
        },
        updateFilterStatus: (state, action) => {
            state.filterStatus = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            taskApiService.endpoints.getTaskList.matchFulfilled,
            (state, action) => {
                state.taskList = action.payload;
            }
        );
    }
})

export const { initTask, addTask, updateTask, deleteTask, updateFilterStatus } = taskSlice.actions;

export default taskSlice.reducer;