import React from "react";

function TracksSortingButton(props) {
  const text = props.text;
  const buttonSortingCriterion = props.sortingCriterion;
  const sortingState = props.sortingState;
  const setSortingState = props.setSortingState;

  function handleSortingClick() {
    if (sortingState.criterion !== buttonSortingCriterion) {
      // First click on the button: activate it.
      setSortingState((draft) => {
        draft.criterion = buttonSortingCriterion;
        draft.isReversed = false;
      });
    } else {
      if (sortingState.isReversed === false) {
        // Second click on the button: reverse the sorting.
        setSortingState((draft) => {
          draft.isReversed = true;
        });
      } else {
        // Third click on the button: deactivate the button.
        setSortingState((draft) => {
          draft.criterion = null;
          draft.isReversed = false;
        });
      }
    }
  }

  return (
    <button onClick={handleSortingClick}>
      {text}{" "}
      {sortingState.criterion === buttonSortingCriterion &&
        (sortingState.isReversed ? "up" : "down")}
    </button>
  );
}

export default TracksSortingButton;
