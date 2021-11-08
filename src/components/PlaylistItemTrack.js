import React from "react";

function PlaylistItemTrack(props) {
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
          <div className="col-2">remove it</div>
        </div>
      </div>
    </section>
  );
}

export default PlaylistItemTrack;
