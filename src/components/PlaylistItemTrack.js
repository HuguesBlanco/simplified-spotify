import React, { useContext } from "react";

import StateContext from "../StateContext";

import RemoveTrackFromPlaylistButton from "./RemoveTrackFromPlaylistButton";

function PlaylistItemTrack(props) {
  const appState = useContext(StateContext);

  const trackInfoToDisplay = props.trackInfo.track;

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-1">
            <img
              src={trackInfoToDisplay.album.images[2].url}
              alt={`${trackInfoToDisplay.album.name} sleeve`}
            />
          </div>
          <div className="col-4">{trackInfoToDisplay.name}</div>
          <div className="col-3">{trackInfoToDisplay.album.name}</div>
          <div className="col-2">{trackInfoToDisplay.album.release_date}</div>
          <div className="col-2">
            <RemoveTrackFromPlaylistButton
              trackUri={trackInfoToDisplay.uri}
              playlistId={appState.currentPlaylist.id}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlaylistItemTrack;
