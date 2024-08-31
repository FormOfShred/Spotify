import { combineReducers } from "redux";

import authentication from "../containers/auth/slice";
import playlist from "../containers/playlists/slice";
import search from "../containers/search/slice";
import darkMode from "../containers/darkMode/slice";

const rootReducer = combineReducers({
  authentication,
  playlist,
  search,
  darkMode,
});

export default rootReducer;
