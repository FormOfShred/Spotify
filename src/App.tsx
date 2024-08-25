import "./App.css";

import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authSelectors } from "./containers/auth/selectors";
import { playlistSelectors } from "./containers/playlists/selectors";
import logo from "./logo.svg";

import Search from "./components/Search";
import AddPlaylistButton from "./components/AddPlaylistButton";
import PlaylistsDropdown from "./components/PlaylistsDropdown";
import TrackList from "./components/TrackList";


const App: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const user = useSelector(authSelectors.getUser);
  const selectedPlaylist = useSelector(playlistSelectors.getSelectedPlaylist);

  console.log(selectedPlaylist);

  // TODO: You can access user data and now fetch user's playlists
  console.log(user);

  return (
    <div className="flex flex-col gap-10 m-10">
      <div className="flex justify-between flex-wrap gap-3">
        <Search />
        <AddPlaylistButton />
      </div>
      <div className="flex gap-10 flex-wrap">
        <PlaylistsDropdown />
        <p className="text-white md:w-1/3 lg:w-1/2">{selectedPlaylist?.description}</p>
      </div>
      <TrackList />
    </div>
  );
};

export default App;
