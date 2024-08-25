import { createSelector } from "@reduxjs/toolkit";
import { PlaylistsState, PlaylistState } from "./slice";
import { RootState } from "../../store/store";

const selectPlaylistsState = (state: RootState): PlaylistsState => state.playlist;
//const selectPlaylistState = (state: RootState): PlaylistState => state.playlist;

export const playlistSelectors = {
    getPlaylists: createSelector(selectPlaylistsState, (playlistsState: PlaylistsState) => playlistsState.playlists),
    createPlaylist: createSelector(selectPlaylistsState, (playlistsState: PlaylistsState) => playlistsState.playlists),
    //getPlaylist: createSelector(selectPlaylistState, (playlistsState: PlaylistState) => playlistsState.playlist),
}