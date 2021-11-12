import React, { useContext } from "react";

import StateContext from "../StateContext";

import AddTrackToPlaylistButton from "./AddTrackToPlaylistButton";

function SearchItemTrack(props) {
  const appState = useContext(StateContext);

  const isTrackAlreadyInPlaylist = appState.tracksInCurrentPlaylist.items.some(
    (trackInPlaylist) => {
      if (trackInPlaylist.track.id === props.trackInfo.id) {
        return true;
      }
      return false;
    }
  );

  return (
    <div
      className={`dropdown-item ${isTrackAlreadyInPlaylist && "disabled"}`}
      key={props.trackInfo.id}
    >
      <img
        src={props.trackInfo.album.images[2].url}
        alt={props.trackInfo.album.name}
      />
      {props.trackInfo.name}
      <AddTrackToPlaylistButton
        trackUri={props.trackInfo.uri}
        playlistId={appState.currentPlaylist.id}
        isTrackAlreadyInPlaylist={isTrackAlreadyInPlaylist}
      />
    </div>
  );
}

export default SearchItemTrack;
