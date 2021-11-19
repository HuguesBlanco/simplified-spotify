import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import DispatchConstext from "../DispatchContext";
import StateContext from "../StateContext";

import PlaylistDetails from "./PlaylistDetails";

function AddPlaylist() {
  const appDispatch = useContext(DispatchConstext);
  const appState = useContext(StateContext);

  const history = useHistory();

  function resetModalValues([, setPlaylistName], [, setPlaylistDescription]) {
    setPlaylistName("");
    setPlaylistDescription("");
  }

  // Create a new playlist in Spotify.
  // Spotify API documentation to create a playlist: https://developer.spotify.com/documentation/web-api/reference/#endpoint-create-playlist
  function createPlaylist([playlistName], [playlistDescription]) {
    Axios.post(
      `https://api.spotify.com/v1/users/${appState.userInfo.id}/playlists`,
      {
        name: playlistName,
        description: playlistDescription,
        public: false
      },
      {
        headers: {
          Authorization: `${appState.spotifyToken.tokenType} ${appState.spotifyToken.accessToken}`,
          "Content-Type": "application/json"
        }
      }
    )
      .then(() => {
        appDispatch({ type: "triggerPlaylistsRefresh" });
        appDispatch({ type: "setSelectedPlaylistIndex", value: 0 });
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          throw error;
        }
        history.push("/error");
      });
  }

  return (
    <PlaylistDetails
      oppeningButtonText="Add playlist"
      oppeningButtonCallback={resetModalValues}
      modalTitle="Add a new playlist"
      modalButtonText="Create Playlist"
      modalButtonCallback={createPlaylist}
    />
  );
}

export default AddPlaylist;
