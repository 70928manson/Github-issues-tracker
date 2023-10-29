import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

import taskReducer from './slices/taskSlice';
import { taskApiService } from './services/taskApi';

const reducers = combineReducers({
    task: taskReducer,
    [taskApiService.reducerPath]: taskApiService.reducer
})

export const store = configureStore({
    reducer: reducers,
    middleware: (getCurrentMiddlewares) => {
    return getCurrentMiddlewares()
    //   .concat(loggerMiddlware)
    //   .concat(mansonMiddlware)
      .concat(taskApiService.middleware)
    }
})

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;