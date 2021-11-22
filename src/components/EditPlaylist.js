import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import DispatchConstext from "../DispatchContext";
import StateContext from "../StateContext";

import PlaylistDetails from "./PlaylistDetails";

function EditPlaylist(props) {
  const appDispatch = useContext(DispatchConstext);
  const appState = useContext(StateContext);

  const history = useHistory();

  function injectModalValues([, setPlaylistName], [, setPlaylistDescription]) {
    setPlaylistName(props.playlistInfo.name);
    setPlaylistDescription(props.playlistInfo.description);
  }

  function editPlaylistInfo([playlistName], [playlistDescription]) {
    Axios.put(
      `https://api.spotify.com/v1/playlists/${props.playlistInfo.id}`,
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
      oppeningButtonText="Edit playlist"
      oppeningButtonCallback={injectModalValues}
      modalTitle="Edit the playlist"
      modalButtonText="Edit Playlist"
      modalButtonCallback={editPlaylistInfo}
    />
  );
}

export default EditPlaylist;
