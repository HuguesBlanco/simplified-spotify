import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import StateContext from "../StateContext";

function PlaylistTracks(props) {
  const history = useHistory();

  const appState = useContext(StateContext);

  const [areTracksLoading, setAreTracksLoading] = useState(true);
  const [tracks, setTracks] = useState();

  // Recover infos about playlist's tracks from Spotify API.
  useEffect(() => {
    setAreTracksLoading(true);

    const tracksRequest = Axios.CancelToken.source();

    async function fetchTracks() {
      // Spotify API documentation to get a Playlist's Items: https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-playlists-tracks
      try {
        const response = await Axios.get(props.playlist.tracks.href, {
          cancelToken: tracksRequest.token,
          headers: {
            Authorization: `${appState.spotifyToken.tokenType} ${appState.spotifyToken.accessToken}`
          }
        });

        setTracks(response.data);
        setAreTracksLoading(false);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          throw error;
        }
        history.push("/error");
      }
    }
    fetchTracks();

    return () => {
      tracksRequest.cancel();
    };
  }, [appState.spotifyToken, props.playlist, history]);

  // Vue
  if (areTracksLoading) {
    return <div>Loading...</div>;
  } else if (tracks.total === 0) {
    return <div>There is no track in this playlist</div>;
  } else {
    return (
      <>
        {tracks.items.map((trackInfo) => (
          <section key={trackInfo.track.id}>
            <div className="container">
              <div className="row">
                <div className="col-1">
                  <img
                    src={trackInfo.track.album.images[2].url}
                    alt={`${trackInfo.track.album.name} sleeve`}
                  />
                </div>
                <div className="col-4">{trackInfo.track.name}</div>
                <div className="col-3">{trackInfo.track.album.name}</div>
                <div className="col-2">
                  {trackInfo.track.album.release_date}
                </div>
                <div className="col-2">remove it</div>
              </div>
            </div>
          </section>
        ))}
      </>
    );
  }
}

export default PlaylistTracks;
