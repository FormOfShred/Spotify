import "./App.css";

import React, { FC, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authSelectors } from "./containers/auth/selectors";
import logo from "./logo.svg";

import Search from "./components/Search";
import AddPlaylistButton from "./components/AddPlaylistButton";
import PlaylistsDropdown from "./components/PlaylistsDropdown";

const App: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const user = useSelector(authSelectors.getUser);

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
        <p className="text-white">Description</p>
      </div>
    </div>
  );
};

export default App;
