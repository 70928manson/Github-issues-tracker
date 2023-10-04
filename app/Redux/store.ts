'use-client';

import { configureStore } from '@reduxjs/toolkit';

import taskReducer from './slices/taskSlice';

export const store = configureStore({
    reducer: {
        counter: taskReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;