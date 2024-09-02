import "./App.css";

import { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authSelectors } from "./containers/auth/selectors";
import { playlistSelectors } from "./containers/playlists/selectors";

import Search from "./components/Search";
import AddPlaylistButton from "./components/AddPlaylistButton";
import PlaylistsDropdown from "./components/PlaylistsDropdown";
import TrackList from "./components/TrackList";
import { getPlaylist, getPlaylists } from "./containers/playlists/slice";
import { darkModeSelectors } from "./containers/darkMode/selectors";
import DarkModeButton from "./components/darkModeButton";


const App: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const user = useSelector(authSelectors.getUser);
  const selectedPlaylist = useSelector(playlistSelectors.getSelectedPlaylist);
  const playlists = useSelector(playlistSelectors.getPlaylists);
  const darkMode = useSelector(darkModeSelectors.getDarkMode);
  const accessToken = useSelector(authSelectors.getAccessToken);

  useEffect(() => {
    if (user && accessToken) {
      dispatch(getPlaylists());
    }
  }, [dispatch, accessToken, user]);

  useEffect(() => {
    if(playlists.length > 0) {
      dispatch(getPlaylist(playlists[0].id!));
    }
  }, [playlists, dispatch]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className={"flex flex-col gap-10 m-10"}>
        <div className="flex justify-between flex-wrap gap-3">
          <Search />
          <div className="flex gap-3">
            <AddPlaylistButton />
            <DarkModeButton />
          </div>
        </div>
        <div className="flex gap-10 flex-wrap">
          <PlaylistsDropdown />
          <p className="text-black dark:text-white md:w-1/3 lg:w-1/2">{selectedPlaylist?.description}</p>
        </div>
        <TrackList />
      </div>
    </div>
  );
};

export default App;
