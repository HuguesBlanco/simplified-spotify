import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router";
import Axios from "axios";

import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

import Page from "./Page";
import SearchTrack from "./SearchTrack";
import AddPlaylist from "./AddPlaylist";
import Playlists from "./Playlists";

function Home() {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  const history = useHistory();

  // Recover user's profile and push it to global state
  useEffect(() => {
    const userProfileRequest = Axios.CancelToken.source();

    async function fetchUserProfile() {
      try {
        const response = await Axios.get("https://api.spotify.com/v1/me", {
          cancelToken: userProfileRequest.token,
          headers: {
            Authorization: `${appState.spotifyToken.tokenType} ${appState.spotifyToken.accessToken}`
          }
        });
        appDispatch({ type: "setUserInfo", value: response.data });
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          throw error;
        }
        history.push("/error");
      }
    }
    fetchUserProfile();

    return () => {
      userProfileRequest.cancel();
    };
  }, [appState.spotifyToken, appDispatch, history]);

  return (
    <Page title="Homepage">
      <div className="row">
        <SearchTrack />
        <AddPlaylist />
      </div>
      <div>
        <Playlists />
      </div>
    </Page>
  );
}

export default Home;
