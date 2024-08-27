import { call, put, select, takeEvery } from "redux-saga/effects";
import { getSearchResults, getSearchResultsFailed, getSearchResultsSuccess, SearchResult } from "./slice";
import { authSelectors } from "../auth/selectors";
import axios from "axios";

function* getSearchResultsSaga(action: ReturnType<typeof getSearchResults>) {
    try {
        console.log('getSearchResultsSaga');
        const accessToken: string = yield select(authSelectors.getAccessToken);
        console.log(action.payload)

        const request = () => axios.get<any>(`https://api.spotify.com/v1/search?q=${action.payload.query}&type=track`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const { data } = yield call(request);

        const topTen = data.tracks.items.slice(0, 10);

        yield put(getSearchResultsSuccess(topTen as SearchResult[]));
    } catch (error: any) {
        yield put(getSearchResultsFailed({ message: error.message }));
    }
}

export default function* searchSaga() {
    yield takeEvery(getSearchResults.type, getSearchResultsSaga);
}