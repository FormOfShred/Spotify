import { createSelector } from "@reduxjs/toolkit";
import { getPlaylists, PlaylistsState } from "./slice";
import { RootState } from "../../store/store";

const selectPlaylistsState = (state: RootState): PlaylistsState => state.playlist;

export const playlistSelectors = {
    getPlaylists: createSelector(selectPlaylistsState, (playlistsState: PlaylistsState) => playlistsState.playlists),
}