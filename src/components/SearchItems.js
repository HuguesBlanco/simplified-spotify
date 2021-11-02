import React from "react";

import SearchItemMessage from "./SearchItemMessage";
import SearchItemTrack from "./SearchItemTrack";

function SearchItems(props) {
  function createItems(searchObject) {
    if (searchObject.isWaintingForResponse) {
      return [<SearchItemMessage message="Loading" />];
    } else {
      if (searchObject.spotifyApiResponse) {
        if (searchObject.spotifyApiResponse.tracks.items.length > 0) {
          return searchObject.spotifyApiResponse.tracks.items.map((track) => {
            return [<SearchItemTrack key={track.id} trackInfo={track} />];
          });
        } else {
          return [<SearchItemMessage message="No track found" />];
        }
      } else {
        return [];
      }
    }
  }

  const itemsToDisplay = createItems(props.search);

  return (
    itemsToDisplay.length > 0 && (
      <ul className="dropdown-menu show">
        {itemsToDisplay.map((item, index) => {
          return <li key={index.toString()}>{item}</li>;
        })}
      </ul>
    )
  );
}

export default SearchItems;
