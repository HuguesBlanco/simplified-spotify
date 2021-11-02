import React from "react";

function SearchItemTrack(props) {
  return (
    <div className="dropdown-item" key={props.trackInfo.id}>
      <img
        src={props.trackInfo.album.images[2].url}
        alt={props.trackInfo.album.name}
      />
      {props.trackInfo.name}
    </div>
  );
}

export default SearchItemTrack;
