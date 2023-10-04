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

export interface CounterState {
    value: number;
    filterStatus: string;
    todoList: any[];  //TODO
}

const initialState: CounterState = {
    value: 0,
    filterStatus: 'all',
    todoList: getInitialTodo(),
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
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

export const { increment, decrement, incrementByAmount } = taskSlice.actions;

export default taskSlice.reducer;