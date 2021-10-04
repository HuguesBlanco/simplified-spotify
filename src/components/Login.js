import React from "react";
import { createConnectionUrl } from "../spotifyAuth";

import Page from "./Page";

function Connection() {
  const connectionUrl = createConnectionUrl();

  return (
    <Page title="Log in">
      <p>Connection page</p>
      <p>
        <a href={connectionUrl}>Connect through Spotify</a>
      </p>
    </Page>
  );
}

export default Connection;
