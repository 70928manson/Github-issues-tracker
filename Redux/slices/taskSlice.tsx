'use-client';

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const getInitialTodo = () => {
  // getting task list
  const localTodoList = window.localStorage.getItem('todoList');
  // if task list is not empty
  if (localTodoList) {
    return JSON.parse(localTodoList);
  }

  window.localStorage.setItem('todoList', JSON.stringify([]));
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
    todoList: ITask[];
}

const initialState: ITaskState = {
    value: 0,
    filterStatus: 'all',
    todoList: getInitialTodo(),
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.todoList.push(action.payload);
            const todoList = window.localStorage.getItem('todoList');
            if (todoList) {
                const todoListArr = JSON.parse(todoList);
                todoListArr.push({
                  ...action.payload,
                });
                window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
            } else {
                window.localStorage.setItem(
                  'todoList',
                  JSON.stringify([
                    {
                      ...action.payload,
                    },
                  ])
                );
            }
        },
        updateTask: (state, action) => {
            const todoList = window.localStorage.getItem('todoList');
            if (todoList) {
                const todoListArr = JSON.parse(todoList);
                todoListArr.forEach((todo: ITask) => {  //TODO
                if (todo.id === action.payload.id) {
                    todo.status = action.payload.status;
                    todo.title = action.payload.title;
                }
                });
                window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
                state.todoList = [...todoListArr];
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