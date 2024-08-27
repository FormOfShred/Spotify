import { combineReducers } from "redux";

import authentication from "../containers/auth/slice";
import playlist from "../containers/playlists/slice";
import search from "../containers/search/slice";

const rootReducer = combineReducers({
  authentication,
  playlist,
  search,
});

export default rootReducer;
