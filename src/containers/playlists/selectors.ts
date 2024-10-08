import { createSelector } from "@reduxjs/toolkit";
import { deleteTrack, getPlaylist, PlaylistsState, PlaylistState } from "./slice";
import { RootState } from "../../store/store";

const selectPlaylistsState = (state: RootState): PlaylistsState => state.playlist;

export const playlistSelectors = {
    getPlaylists: createSelector(selectPlaylistsState, (playlistsState: PlaylistsState) => playlistsState.playlists),
    createPlaylist: createSelector(selectPlaylistsState, (playlistsState: PlaylistsState) => playlistsState.playlists),
    getPlaylist: createSelector(selectPlaylistsState, (playlistsState: PlaylistsState) => playlistsState.playlist),
    getSelectedPlaylist: createSelector(selectPlaylistsState, (playlistsState: PlaylistsState) => playlistsState.playlist),
    deleteTrack: createSelector(selectPlaylistsState, (playlistsState: PlaylistsState) => playlistsState.playlist),
    addTrack: createSelector(selectPlaylistsState, (playlistsState: PlaylistsState) => playlistsState.playlist),
}