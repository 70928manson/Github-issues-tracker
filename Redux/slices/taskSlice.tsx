import { createSlice } from "@reduxjs/toolkit";
import { taskApiService } from "../services/taskApi";

//Temp  api response回傳後希望長的樣子
export interface ITask {
    completed: boolean;
    id: number;
    title: string;
    body: string;
    label: string[];
    time: string;
    created_at: string;
    status: string;
    state: string;
    number: number; //編輯和刪除都會用到
}

export interface ITaskState {
    value: number;
    filterLabel: string;
    taskList: ITask[];
}

// reducers改變store內的state, 資料供畫面呈現
const initialState: ITaskState = {
    value: 0,
    filterLabel: 'Open',
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
                    task.body = action.payload.body
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
        updateFilterLabel: (state, action) => {
            state.filterLabel = action.payload;
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

export const { initTask, addTask, updateTask, deleteTask, updateFilterLabel } = taskSlice.actions;

export default taskSlice.reducer;