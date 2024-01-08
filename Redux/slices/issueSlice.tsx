import { createSlice } from "@reduxjs/toolkit";
import { issueApiService } from "../services/issueApi";

//Temp  api response回傳後希望長的樣子
export interface IIssue {
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

export interface IIsueState {
    value: number;
    filterLabel: string;
    issueList: IIssue[];
}

// reducers改變store內的state, 資料供畫面呈現
const initialState: IIsueState = {
    value: 0,
    filterLabel: 'Open',
    issueList: [],
}

export const issueSlice = createSlice({
    name: 'issue',
    initialState,
    reducers: {
        initIssue: (state, action) => {
            state.issueList = action.payload;
        },
        addIssue: (state, action) => {
            state.issueList.push(action.payload);
        },
        updateIssue: (state, action) => {
            state.issueList.forEach((issue: IIssue) => {
                if (issue.id === action.payload.id) {
                    issue.status = action.payload.status;
                    issue.title = action.payload.title;
                    issue.body = action.payload.body;
                    issue.status = action.payload.label
                }
            });
        },
        deleteIssue: (state, action) => {
            state.issueList.forEach((issue: IIssue, index: number) => {
                if (issue.id === action.payload) {
                    state.issueList.splice(index, 1);
                }
            });
        },
        updateFilterLabel: (state, action) => {
            state.filterLabel = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            issueApiService.endpoints.getIssueList.matchFulfilled,
            (state, action) => {
                state.issueList = action.payload;
            }
        );
    }
})

export const { initIssue, addIssue, updateIssue, deleteIssue, updateFilterLabel } = issueSlice.actions;

export default issueSlice.reducer;