import React, { useContext } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

function RemoveTrackFromPlaylistButton(props) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const history = useHistory();

  function removeTrackFromPlaylist() {
    Axios.delete(
      `https://api.spotify.com/v1/playlists/${props.playlistId}/tracks`,
      {
        headers: {
          Authorization: `${appState.spotifyToken.tokenType} ${appState.spotifyToken.accessToken}`,
          "Content-Type": "application/json"
        },
        data: {
          tracks: [
            {
              uri: props.trackUri
            }
          ]
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
      onClick={removeTrackFromPlaylist}
      type="button"
      className="btn btn-dark"
    >
      remove
    </button>
  );
}

export default RemoveTrackFromPlaylistButton;
