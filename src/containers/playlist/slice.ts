import { createAction, createSlice } from "@reduxjs/toolkit";
import { Playlist, Track } from "../../types/playlists";
import { ErrorPayload, RequestStatus } from "../../types/requests";

export interface PlaylistsState {
    playlists: Playlist[];
    status: RequestStatus;
    error?: string;
}

const initialState: PlaylistsState = {
    playlists: [],
    status: RequestStatus.IDLE,
};

// actions
export const getPlaylists = createAction("playlist/getPlaylists");
export const getPlaylistsSuccess = createAction<Playlist[]>("playlist/getPlaylistsSuccess");
export const getPlaylistsFailed = createAction<ErrorPayload>("playlist/getPlaylistsFailed");

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPlaylists, (state) => {
                state.status = RequestStatus.PENDING;   
            })
            .addCase(getPlaylistsSuccess, (state, action) => {
                state.playlists = action.payload;
                state.status = RequestStatus.SUCCESS;
            })
            .addCase(getPlaylistsFailed, (state, action) => {
                state.status = RequestStatus.ERROR;
                state.error = action.payload.message;
            });
    },
});

export const { } = playlistSlice.actions;

export default playlistSlice.reducer;