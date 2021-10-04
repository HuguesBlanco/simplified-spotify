import React, { useContext } from "react";

import StateContext from "../StateContext";

import Page from "./Page";
import SearchTrack from "./SearchTrack";
import AddPlaylist from "./AddPlaylist";
import Playlist from "./Playlist";

function Home() {
  const appState = useContext(StateContext);

  console.log("TOKEN: ", appState.spotifyToken);
  console.log("IS LOGGED IN: ", appState.isLoggedIn);

  return (
    <Page title="Homepage">
      <div className="row">
        <SearchTrack />
        <AddPlaylist />
      </div>
      <Playlist />
    </Page>
  );
}

export default Home;
