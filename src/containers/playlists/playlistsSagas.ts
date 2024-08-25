import { call, put, select, takeEvery } from 'redux-saga/effects';

import { createPlaylist, createPlaylistFailed, createPlaylistSuccess, 
    getPlaylist, getPlaylistFailed, getPlaylistSuccess,
    getPlaylists, getPlaylistsFailed, getPlaylistsSuccess } from './slice';
import { authSelectors } from '../auth/selectors';
import { User } from '../auth/slice';
import { Playlist } from '../../types/playlists';
import axios from 'axios';

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
        console.log(data);

        yield put(getPlaylistSuccess({} as Playlist));
    } catch (error: any) {
        yield put(getPlaylistFailed({ message: error.message }));
    }
}

export default function* playlistsSaga() {
    yield takeEvery(getPlaylists.type, getPlaylistsSaga);
    yield takeEvery(createPlaylist.type, createPlaylistSaga);
    yield takeEvery(getPlaylist.type, getPlaylistSaga);
}