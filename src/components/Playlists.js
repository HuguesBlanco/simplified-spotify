import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

import PlaylistTracks from "./PlaylistTracks";

function Playlist() {
  const appState = useContext(StateContext);
  const DispatchState = useContext(DispatchContext);

  const history = useHistory();

  const [playlists, setPlaylists] = useState(null);
  const [arePlaylistsLoading, setArePlaylistsLoading] = useState(true);
  const [selectedPlaylistIndex, setSelectedPlaylistIndex] = useState(0);

  function handlePlaylistChange(event) {
    const playlistIndex = Number(event.target.value);
    setSelectedPlaylistIndex(playlistIndex);
  }

  // Recover insfo about user's playlists from Spotify API.
  useEffect(() => {
    setArePlaylistsLoading(true);

    const playlistsRequest = Axios.CancelToken.source();

    async function fetchPlaylists() {
      // Spotify API documentation to get a list of current user's playlists: https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-a-list-of-current-users-playlists
      try {
        const response = await Axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            cancelToken: playlistsRequest.token,
            headers: {
              Authorization: `${appState.spotifyToken.tokenType} ${appState.spotifyToken.accessToken}`
            }
          }
        );

        setPlaylists(response.data);
        setSelectedPlaylistIndex(0);
        setArePlaylistsLoading(false);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          throw error;
        }
        history.push("/error");
      }
    }
    fetchPlaylists();

    return () => {
      playlistsRequest.cancel();
    };
  }, [appState.spotifyToken, appState.playlistRefreshTrigger, history]);

  // Set selected playlist in global state.
  useEffect(() => {
    if (playlists) {
      DispatchState({
        type: "setCurrentPlaylist",
        value: playlists.items[selectedPlaylistIndex]
      });
    }
  }, [DispatchState, playlists, selectedPlaylistIndex]);

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
              value={selectedPlaylistIndex}
            >
              {playlists.items.map((playlist, playlistIndex) => (
                <option value={playlistIndex} key={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-8">
            {playlists.items[selectedPlaylistIndex].description}
          </div>
        </div>
        <div className="row">
          <PlaylistTracks playlist={playlists.items[selectedPlaylistIndex]} />
        </div>
      </>
    );
  }
}

export default Playlist;
