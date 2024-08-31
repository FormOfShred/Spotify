import { createAction, createSlice } from "@reduxjs/toolkit";
import { Playlist } from "../../types/playlists";
import { ErrorPayload, RequestStatus } from "../../types/requests";

export interface PlaylistsState {
    playlists: Playlist[];
    playlist?: Playlist;
    status: RequestStatus;
    error?: string;
}

export interface PlaylistState {
    playlist: Playlist;
    status: RequestStatus;
    error?: string;
}

const initialState: PlaylistsState = {
    playlists: [],
    playlist: undefined,
    status: RequestStatus.IDLE,
};

// actions
export const getPlaylists = createAction("playlist/getPlaylists");
export const getPlaylistsSuccess = createAction<Playlist[]>("playlist/getPlaylistsSuccess");
export const getPlaylistsFailed = createAction<ErrorPayload>("playlist/getPlaylistsFailed");

export const createPlaylist = createAction("playlist/createPlaylist", (name: string, description: string, publicPlaylist: boolean) => ({
    payload: { name, description, publicPlaylist },
}));
export const createPlaylistSuccess = createAction<Playlist>("playlist/createPlaylistSuccess");
export const createPlaylistFailed = createAction<ErrorPayload>("playlist/createPlaylistFailed");

export const getPlaylist = createAction("playlist/getPlaylist", (playlistId: string) => ({
    payload: { playlistId },
}));
export const getPlaylistSuccess = createAction<Playlist>("playlist/getPlaylistSuccess");
export const getPlaylistFailed = createAction<ErrorPayload>("playlist/getPlaylistFailed");

export const deleteTrack = createAction("playlist/deleteTrack", (playlistId: string | undefined, trackUri: string) => ({
    payload: { playlistId, trackUri },
}));
export const deleteTrackSuccess = createAction<Playlist>("playlist/deleteTrackSuccess");
export const deleteTrackFailed = createAction<ErrorPayload>("playlist/deleteTrackFailed");

export const addTrack = createAction("playlist/addTrack", (trackUri: string) => ({
    payload: { trackUri },
}));
export const addTrackSuccess = createAction<Playlist>("playlist/addTrackSuccess");
export const addTrackFailed = createAction<ErrorPayload>("playlist/addTrackFailed");


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
            })
            .addCase(createPlaylist, (state) => {
                state.status = RequestStatus.PENDING;
            })
            .addCase(createPlaylistSuccess, (state, action) => {
                state.playlists.push(action.payload);
                state.status = RequestStatus.SUCCESS;
            })
            .addCase(createPlaylistFailed, (state, action) => {
                state.status = RequestStatus.ERROR;
                state.error = action.payload.message;
            })
            .addCase(getPlaylist, (state) => {
                state.status = RequestStatus.PENDING;
            })
            .addCase(getPlaylistSuccess, (state, action) => {
                state.playlist = action.payload;
                state.status = RequestStatus.SUCCESS;
            })
            .addCase(getPlaylistFailed, (state, action) => {
                state.status = RequestStatus.ERROR;
                state.error = action.payload.message;
            })
            .addCase(deleteTrack, (state) => {
                state.status = RequestStatus.PENDING;
            })
            .addCase(deleteTrackSuccess, (state, action) => {
                state.status = RequestStatus.SUCCESS;
            })
            .addCase(deleteTrackFailed, (state, action) => {
                //state.status = RequestStatus.ERROR;
                state.error = action.payload.message;
            })
            .addCase(addTrack, (state) => {
                state.status = RequestStatus.PENDING;
            })
            .addCase(addTrackSuccess, (state, action) => {
                state.playlist = action.payload;
                state.status = RequestStatus.SUCCESS;
            })
            .addCase(addTrackFailed, (state, action) => {
                state.status = RequestStatus.ERROR;
                state.error = action.payload.message;
            });
    },
});

export const {  } = playlistSlice.actions;

export default playlistSlice.reducer;