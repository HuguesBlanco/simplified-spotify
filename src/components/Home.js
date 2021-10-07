import React from "react";

import Page from "./Page";
import SearchTrack from "./SearchTrack";
import AddPlaylist from "./AddPlaylist";
import Playlists from "./Playlists";

function Home() {
  return (
    <Page title="Homepage">
      <div className="row">
        <SearchTrack />
        <AddPlaylist />
      </div>
      <div>
        <Playlists />
      </div>
    </Page>
  );
}

export default Home;
