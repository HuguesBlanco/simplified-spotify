import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

import PlaylistItemMessage from "./PlaylistItemMessage";
import PlaylistItemTrack from "./PlaylistItemTrack";

function PlaylistTracks(props) {
  const history = useHistory();

  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const [areTracksLoading, setAreTracksLoading] = useState(true);

  // Recover infos about playlist's tracks from Spotify API.
  // Spotify API documentation to get a Playlist's Items: https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-playlists-tracks
  useEffect(() => {
    setAreTracksLoading(true);

    const tracksRequestCancelToken = Axios.CancelToken.source();

    Axios.get(props.playlist.tracks.href, {
      cancelToken: tracksRequestCancelToken.token,
      headers: {
        Authorization: `${appState.spotifyToken.tokenType} ${appState.spotifyToken.accessToken}`
      }
    })
      .then((response) => {
        appDispatch({
          type: "setTracksInCurrentPlaylist",
          value: response.data
        });
        setAreTracksLoading(false);
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          throw error;
        }
        history.push("/error");
      });

    return () => {
      tracksRequestCancelToken.cancel();
    };
  }, [appDispatch, appState.spotifyToken, props.playlist, history]);

  // Vue
  if (areTracksLoading) {
    return <PlaylistItemMessage message="Loading..." />;
  } else {
    if (appState.tracksInCurrentPlaylist.total === 0) {
      return (
        <PlaylistItemMessage message="There is no track in this playlist" />
      );
    } else {
      return (
        <>
          {appState.tracksInCurrentPlaylist.items.map((trackInfo) => (
            <PlaylistItemTrack
              key={trackInfo.track.id + trackInfo.added_at}
              trackInfo={trackInfo}
            />
          ))}
        </>
      );
    }
  }
}

export default PlaylistTracks;
