import { call, put, select, takeEvery } from 'redux-saga/effects';

import { getPlaylists, getPlaylistsFailed, getPlaylistsSuccess } from './slice';
import { authSelectors } from '../auth/selectors';
import { User } from '../auth/slice';
import { Playlist } from '../../types/playlists';
import axios from 'axios';

function* getPlaylistsSaga() {
    try {
        // TODO: https://api.spotify.com/v1/users/${user_id}/playlists
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
        // TODO
        yield put(getPlaylistsFailed({ message: error.message }));
    }
}

export default function* playlistSaga() {
    yield takeEvery(getPlaylists.type, getPlaylistsSaga);
}