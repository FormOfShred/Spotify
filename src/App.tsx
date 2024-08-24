import "./App.css";

import React, { FC, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authSelectors } from "./containers/auth/selectors";
import logo from "./logo.svg";

import Search from "./components/Search";
import AddPlaylistButton from "./components/AddPlaylistButton";

const App: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const user = useSelector(authSelectors.getUser);

  // TODO: You can access user data and now fetch user's playlists
  console.log(user);

  return (
    <div className="mx-auto">
      <div className="d-flex justify-content-between m-5">
        <Search />
        <AddPlaylistButton />
      </div>
    </div>
  );
};

export default App;
