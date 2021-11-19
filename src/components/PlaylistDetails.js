import React, { useState } from "react";

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

  // Vue
  return (
    <div className="col-lg">
      {/* button - start */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addPlaylistModal"
        onClick={handleModalOpening}
      >
        {oppeningButtonText}
      </button>
      {/* button - end */}

      {/* modal - start */}
      <div
        className="modal fade"
        id="addPlaylistModal"
        tabIndex="-1"
        aria-labelledby="createPlaylistLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-md-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createPlaylistLabel">
                {modalTitle}
              </h5>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="playlistName"
                    placeholder="Name your playlist"
                    value={playlistName}
                    onChange={handlePlaylistNameInput}
                  />
                  <label htmlFor="playlistName">Playlist name</label>
                </div>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Describe your playlist"
                    id="playlistDescription"
                    value={playlistDescription}
                    onChange={handlePlaylistDescriptionInput}
                  ></textarea>
                  <label htmlFor="playlistDescription">
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
