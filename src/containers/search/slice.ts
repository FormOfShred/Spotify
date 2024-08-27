import { createAction, createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../../types/requests";

export interface SearchState {
    searchResults: SearchResult[];
    status: RequestStatus;
    error?: string;
}

export interface SearchResult {
    id: string;
    name: string;
    artists: [
        {
            name: string;
        }
    ]
    album: {
        images: [
            {
                url: string;
            }
        ]
    }
    uri: string;
}

const initialState: SearchState = {
    searchResults: [],
    status: RequestStatus.IDLE,
};

// actions
export const getSearchResults = createAction("search/getSearchResults", (query: string) => ({
    payload: { query },
}));
export const getSearchResultsSuccess = createAction<SearchResult[]>("search/getSearchResultsSuccess");
export const getSearchResultsFailed = createAction<{ message: string }>("search/getSearchResultsFailed");

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSearchResults, (state) => {
                state.status = RequestStatus.PENDING;
            })
            .addCase(getSearchResultsSuccess, (state, action) => {
                state.searchResults = action.payload;
                state.status = RequestStatus.SUCCESS;
            })
            .addCase(getSearchResultsFailed, (state, action) => {
                state.error = action.payload.message;
                state.status = RequestStatus.ERROR;
            });
    },
});

export default searchSlice.reducer;