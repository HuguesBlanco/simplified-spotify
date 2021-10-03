import React from "react";
import { createConnectionUrl } from "../spotifyAuth";

function Connection() {
  const connectionUrl = createConnectionUrl();

  return (
    <>
      <p>Connection page</p>
      <p>
        <a href={connectionUrl}>Connect through Spotify</a>
      </p>
    </>
  );
}

export default Connection;
