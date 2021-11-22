import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

import EditPlaylist from "./EditPlaylist";
import PlaylistTracks from "./PlaylistTracks";

function Playlist() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const history = useHistory();

  const [playlists, setPlaylists] = useState(null);
  const [arePlaylistsLoading, setArePlaylistsLoading] = useState(true);

  function handlePlaylistChange(event) {
    const playlistIndex = Number(event.target.value);
    appDispatch({ type: "setSelectedPlaylistIndex", value: playlistIndex });
  }

  // Recover insfo about user's playlists from Spotify API.
  // Spotify API documentation to get a list of current user's playlists: https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-a-list-of-current-users-playlists
  useEffect(() => {
    setArePlaylistsLoading(true);

    const playlistsRequestCancelToken = Axios.CancelToken.source();

    Axios.get("https://api.spotify.com/v1/me/playlists", {
      cancelToken: playlistsRequestCancelToken.token,
      headers: {
        Authorization: `${appState.spotifyToken.tokenType} ${appState.spotifyToken.accessToken}`
      }
    })
      .then((response) => {
        setPlaylists(response.data);
        setArePlaylistsLoading(false);
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          throw error;
        }
        history.push("/error");
      });

    return () => {
      playlistsRequestCancelToken.cancel();
    };
  }, [appState.spotifyToken, appState.playlistsRefreshTrigger, history]);

  // Select first playlist if no playlist are selected (when app starts)
  useEffect(() => {
    appDispatch({ type: "setSelectedPlaylistIndex", value: 0 });
  }, [appDispatch]);

  // Set selected playlist in global state.
  useEffect(() => {
    if (playlists) {
      appDispatch({
        type: "setCurrentPlaylist",
        value: playlists.items[appState.selectedPlaylistIndex]
      });
    }
  }, [appDispatch, playlists, appState.selectedPlaylistIndex]);

  // Vue
  if (arePlaylistsLoading) {
    return <>Loading...</>;
  } else if (playlists.total === 0) {
    return <>You don't have any playlist</>;
  } else {
    return (
      <>
        <div className="row">
          <div className="col-4">
            <select
              className="form-select"
              onChange={handlePlaylistChange}
              value={appState.selectedPlaylistIndex}
            >
              {playlists.items.map((playlist, playlistIndex) => (
                <option value={playlistIndex} key={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6">
            {playlists.items[appState.selectedPlaylistIndex].description}
          </div>
          <div className="col-2">
            <EditPlaylist
              playlistInfo={playlists.items[appState.selectedPlaylistIndex]}
            />
          </div>
        </div>
        <div className="row">
          <PlaylistTracks
            playlist={playlists.items[appState.selectedPlaylistIndex]}
          />
        </div>
      </>
    );
  }
}

export default Playlist;
