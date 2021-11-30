import React, { useEffect } from "react";
import { useImmer } from "use-immer";

import { getValueInObject } from "../utils";

import TracksSortingButton from "./TracksSortingButton";

function TracksSorting(props) {
  const tracks = props.tracks;
  const setSortedTracks = props.setSortedTracks;

  const [sorting, setSorting] = useImmer({
    criterion: null,
    isReversed: false
  });

  // Sorting criterions.
  const SONG = "song";
  const ALBUM = "album";
  const RELEASE_DATE = "release date";

  // Sort tracks in function of sorting state.
  useEffect(() => {
    const sortingFunctionsComparaison = {
      [SONG]: (trackA, trackB) => {
        const pathToComparaisonValue = "track.name";
        const songNameA = getValueInObject(trackA, pathToComparaisonValue);
        const songNameB = getValueInObject(trackB, pathToComparaisonValue);
        return songNameA.localeCompare(songNameB);
      },

      [ALBUM]: (trackA, trackB) => {
        const pathToComparaisonValue = "track.album.name";
        const albumNameA = getValueInObject(trackA, pathToComparaisonValue);
        const albumNameB = getValueInObject(trackB, pathToComparaisonValue);
        return albumNameA.localeCompare(albumNameB);
      },

      [RELEASE_DATE]: (trackA, trackB) => {
        const pathToComparaisonValue = "track.album.release_date";
        const dateA = getValueInObject(trackA, pathToComparaisonValue);
        const dateB = getValueInObject(trackB, pathToComparaisonValue);

        const dateObjA = new Date(dateA);
        const dateObjB = new Date(dateB);

        if (dateObjA < dateObjB) {
          return -1;
        } else if (dateObjA > dateObjB) {
          return 1;
        } else {
          return 0;
        }
      }
    };

    const comparaisonFunctionUsed =
      sortingFunctionsComparaison[sorting.criterion];
    const sortedTracks = [...tracks].sort(comparaisonFunctionUsed); // Spread tracks in a new array to keep immutability.

    if (sorting.isReversed) {
      setSortedTracks(sortedTracks.reverse());
    } else {
      setSortedTracks(sortedTracks);
    }
  }, [setSortedTracks, sorting, tracks]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-1"></div>
        <div className="col-4">
          <TracksSortingButton
            text="Title"
            sortingCriterion={SONG}
            sortingState={sorting}
            setSortingState={setSorting}
          />
        </div>
        <div className="col-3">
          <TracksSortingButton
            text="Album"
            sortingCriterion={ALBUM}
            sortingState={sorting}
            setSortingState={setSorting}
          />
        </div>
        <div className="col-2">
          <TracksSortingButton
            text="Release date"
            sortingCriterion={RELEASE_DATE}
            sortingState={sorting}
            setSortingState={setSorting}
          />
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
}

export default TracksSorting;
