import React, { useContext } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

function AddTrackToPlaylistButton(props) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const history = useHistory();

  function addTrackToPlaylist() {
    Axios.post(
      `https://api.spotify.com/v1/playlists/${props.playlistId}/tracks`,
      {
        uris: [props.trackUri]
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
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          throw error;
        }
        history.push("/error");
      });
  }

  return (
    <button
      onClick={addTrackToPlaylist}
      type="button"
      className={`btn ${
        props.isTrackAlreadyInPlaylist ? "btn-secondary" : "btn-primary"
      }`}
    >
      +
    </button>
  );
}

export default AddTrackToPlaylistButton;
