import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import DispatchConstext from "../DispatchContext";
import StateContext from "../StateContext";

function AddPlaylist() {
  const appDispatch = useContext(DispatchConstext);
  const appState = useContext(StateContext);

  const history = useHistory();

  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");

  function handleModalOpening() {
    setPlaylistName("");
    setPlaylistDescription("");
  }

  function handlePlaylistNameInput(event) {
    setPlaylistName(event.target.value);
  }
  function handlePlaylistDescriptionInput(event) {
    setPlaylistDescription(event.target.value);
  }
  async function createPlaylist() {
    // Spotify API documentation to create a playlist:https://developer.spotify.com/documentation/web-api/reference/#endpoint-create-playlist
    try {
      await Axios.post(
        `https://api.spotify.com/v1/users/${appState.userInfo.id}/playlists`,
        {
          name: playlistName,
          description: playlistDescription,
          public: false
        },
        {
          headers: {
            Authorization: `${appState.spotifyToken.tokenType} ${appState.spotifyToken.accessToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      appDispatch({ type: "triggerPlaylistsRefresh" });
      appDispatch({ type: "setSelectedPlaylistIndex", value: 0 });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        throw error;
      }
      history.push("/error");
    }
  }

  return (
    <div className="col-lg">
      {/* Add playlist button - start */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addPlaylistModal"
        onClick={handleModalOpening}
      >
        Add new playlist
      </button>
      {/* Add playlist button - end */}

      {/* Add playlist modal - start */}
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
                Add new playlist
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
                onClick={createPlaylist}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Add playlist modal - end */}
    </div>
  );
}

export default AddPlaylist;
