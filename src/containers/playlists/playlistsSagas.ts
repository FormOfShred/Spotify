import { call, put, select, takeEvery } from 'redux-saga/effects';

import { createPlaylist, createPlaylistFailed, createPlaylistSuccess, 
    deleteTrack, 
    deleteTrackFailed, 
    deleteTrackSuccess, 
    getPlaylist, getPlaylistFailed, getPlaylistSuccess,
    getPlaylists, getPlaylistsFailed, getPlaylistsSuccess } from './slice';
import { authSelectors } from '../auth/selectors';
import { User } from '../auth/slice';
import { Playlist } from '../../types/playlists';
import axios from 'axios';
import { playlistSelectors } from './selectors';

function* getPlaylistsSaga() {
    try {
        const user: User = yield select(authSelectors.getUser);
        const accessToken: string = yield select(authSelectors.getAccessToken);

        const request = () => axios.get<any>(`https://api.spotify.com/v1/users/${user.userId}/playlists`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const { data } = yield call(request);

        yield put(getPlaylistsSuccess(data.items as Playlist[] ));
    } catch (error: any) {
        yield put(getPlaylistsFailed({ message: error.message }));
    }
}

function* createPlaylistSaga(action: ReturnType<typeof createPlaylist>) {
    try {
        const user: User = yield select(authSelectors.getUser);
        const accessToken: string = yield select(authSelectors.getAccessToken);

        const request = () => axios.post<any>(`https://api.spotify.com/v1/users/${user.userId}/playlists`, {
            name: action.payload.name,
            description: action.payload.description,
            public: action.payload.publicPlaylist,
        }, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const { data } = yield call(request);

        yield put(createPlaylistSuccess(data.item as Playlist));
    } catch (error: any) {
        yield put(createPlaylistFailed({ message: error.message }));
    }
}

function* getPlaylistSaga(action: ReturnType<typeof getPlaylist>) {
    try {
        const accessToken: string = yield select(authSelectors.getAccessToken);

        const request = () => axios.get<any>(`https://api.spotify.com/v1/playlists/${action.payload.playlistId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const { data } = yield call(request);

        yield put(getPlaylistSuccess(data as Playlist));
    } catch (error: any) {
        yield put(getPlaylistFailed({ message: error.message }));
    }
}

function* deleteTrackSaga(action: ReturnType<typeof deleteTrack>) {
    try {
        const accessToken: string = yield select(authSelectors.getAccessToken);

        const request = () => axios.delete<any>(`https://api.spotify.com/v1/playlists/${action.payload.playlistId}/tracks`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            data: { tracks: [{ uri: action.payload.trackUri }] },
        });
        yield call(request);
        const { data } = yield call(request);
        //yield put(deleteTrackSuccess(data as Playlist));
    } catch (error: any) {
        yield put(deleteTrackFailed({ message: error.message }));
    }
}

export default function* playlistsSaga() {
    yield takeEvery(getPlaylists.type, getPlaylistsSaga);
    yield takeEvery(createPlaylist.type, createPlaylistSaga);
    yield takeEvery(getPlaylist.type, getPlaylistSaga);
    yield takeEvery(deleteTrack.type, deleteTrackSaga);
}