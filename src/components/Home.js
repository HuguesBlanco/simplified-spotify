import React, { useContext } from "react";

import StateContext from "../StateContext";

import Page from "./Page";

function Home() {
  const appState = useContext(StateContext);

  console.log("TOKEN: ", appState.spotifyToken);
  console.log("IS LOGGED IN: ", appState.isLoggedIn);

  return (
    <Page title="Homepage">
      <p>Homepage</p>
    </Page>
  );
}

export default Home;
