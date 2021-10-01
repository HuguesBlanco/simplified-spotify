import React from "react";
import { getTokenInfo } from "../spotifyAuth";

function Home() {
  const token = getTokenInfo();

  return (
    <>
      <p>Home Component</p>
    </>
  );
}

export default Home;
