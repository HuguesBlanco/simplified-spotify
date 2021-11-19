import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function PlaylistDetails(props) {
  // Props
  const oppeningButtonText = props.oppeningButtonText;
  const oppeningButtonCallback = props.oppeningButtonCallback;
  const modalTitle = props.modalTitle;
  const modalButtonText = props.modalButtonText;
  const modalButtonCallback = props.modalButtonCallback;

  // Form control
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");

  function handlePlaylistNameInput(event) {
    setPlaylistName(event.target.value);
  }
  function handlePlaylistDescriptionInput(event) {
    setPlaylistDescription(event.target.value);
  }

  // Events
  function handleModalOpening() {
    oppeningButtonCallback(
      [playlistName, setPlaylistName],
      [playlistDescription, setPlaylistDescription]
    );
  }

  function handleClickOnActionButton() {
    modalButtonCallback(
      [playlistName, setPlaylistName],
      [playlistDescription, setPlaylistDescription]
    );
  }

  // unique IDs.
  // Required to be sure that id of HTML elements are unique if this component is used several times.
  // IDs start with "id-" because HTML IDs must start with a letter
  const id1 = useRef(`id-${uuidv4()}`);
  const id2 = useRef(`id-${uuidv4()}`);
  const id3 = useRef(`id-${uuidv4()}`);
  const id4 = useRef(`id-${uuidv4()}`);

  // Vue
  return (
    <div className="col-lg">
      {/* button - start */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#${id1.current}`}
        onClick={handleModalOpening}
      >
        {oppeningButtonText}
      </button>
      {/* button - end */}

      {/* modal - start */}
      <div
        className="modal fade"
        id={id1.current}
        tabIndex="-1"
        aria-labelledby={id2.current}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-md-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={id2.current}>
                {modalTitle}
              </h5>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id={id3.current}
                    placeholder="Name your playlist"
                    value={playlistName}
                    onChange={handlePlaylistNameInput}
                  />
                  <label htmlFor={id3.current}>Playlist name</label>
                </div>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Describe your playlist"
                    id={id4.current}
                    value={playlistDescription}
                    onChange={handlePlaylistDescriptionInput}
                  ></textarea>
                  <label htmlFor={id4.current}>
                    Playlist description (optional)
                  </label>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleClickOnActionButton}
              >
                {modalButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* modal - end */}
    </div>
  );
}

export default PlaylistDetails;
