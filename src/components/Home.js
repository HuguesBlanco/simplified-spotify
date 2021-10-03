import React, { useContext } from "react";

import StateContext from "../StateContext";

function Home() {
  const appState = useContext(StateContext);

  console.log("TOKEN: ", appState.spotifyToken);
  console.log("IS LOGGED IN: ", appState.isLoggedIn);

  return (
    <>
      <p>Home page</p>
    </>
  );
}

export default Home;
