import { call, put, select, takeEvery } from 'redux-saga/effects';

import { createPlaylist, createPlaylistFailed, createPlaylistSuccess, getPlaylists, getPlaylistsFailed, getPlaylistsSuccess } from './slice';
import { authSelectors } from '../auth/selectors';
import { User } from '../auth/slice';
import { Playlist } from '../../types/playlists';
import axios from 'axios';

function* getPlaylistsSaga() {
    try {
        const user: User = yield select(authSelectors.getUser);
        const userId = user.userId;
        const accessToken: string = yield select(authSelectors.getAccessToken);
        console.log(userId);
        const request = () => axios.get<any>(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const { data } = yield call(request);
        console.log(data.items);

        yield put(getPlaylistsSuccess(data.items as Playlist[] ));
    } catch (error: any) {
        yield put(getPlaylistsFailed({ message: error.message }));
    }
}

function* createPlaylistSaga(action: ReturnType<typeof createPlaylist>) {
    try {
        // TODO: change body
        const user: User = yield select(authSelectors.getUser);
        const userId = user.userId;
        const accessToken: string = yield select(authSelectors.getAccessToken);
        console.log(accessToken)
        const request = () => axios.post<any>(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            name: action.payload.name,
            description: action.payload.description,
            public: false,
        }, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const { data } = yield call(request);
        console.log(data);

        yield put(createPlaylistSuccess(data.item as Playlist));
    } catch (error: any) {
        yield put(createPlaylistFailed({ message: error.message }));
    }
}

export default function* playlistSaga() {
    yield takeEvery(getPlaylists.type, getPlaylistsSaga);
    yield takeEvery(createPlaylist.type, createPlaylistSaga);
}