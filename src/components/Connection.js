import React from "react";
import { createConnectionUrl } from "../spotifyAuth";

function Connection() {
  const connectionUrl = createConnectionUrl();

  return (
    <>
      <p>Connection page</p>
      <p className="text-center">
        <a href={connectionUrl}>Connect through Spotify</a>
      </p>
      <p>{connectionUrl}</p>
    </>
  );
}

export default Connection;
