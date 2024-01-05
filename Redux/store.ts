import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

import issueReducer from './slices/issueSlice';
import { issueApiService } from './services/issueApi';

const reducers = combineReducers({
    issue: issueReducer,
    [issueApiService.reducerPath]: issueApiService.reducer
})

export const store = configureStore({
    reducer: reducers,
    middleware: (getCurrentMiddlewares) => {
    return getCurrentMiddlewares()
    //   .concat(loggerMiddlware)
    //   .concat(mansonMiddlware)
      .concat(issueApiService.middleware)
    }
})

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;