import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useImmerReducer } from "use-immer";

import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

import Login from "./components/Login";
import LoginCallback from "./components/LoginCallback";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Error from "./components/Error";

function App() {
  function globalReducer(draft, action) {
    switch (action.type) {
      case "checkConnection":
        if (!draft.spotifyToken) {
          draft.isLoggedIn = false;
          break;
        }

        const now = new Date();
        const connectionTime = draft.spotifyToken.creationTime;
        const timeConnected = now - connectionTime;
        const timeConnectedInSec = Math.ceil(timeConnected / 1000);
        const timeBeforeExpiresInSec = draft.spotifyToken.expiresIn;
        if (timeConnectedInSec >= timeBeforeExpiresInSec) {
          draft.isLoggedIn = false;
          break;
        }

        draft.isLoggedIn = true;
        break;

      case "setSpotifyToken":
        draft.spotifyToken = action.value;
        break;

      case "setUserInfo":
        draft.userInfo = action.value;
        break;

      case "setCurrentPlaylist":
        draft.currentPlaylist = action.value;
        break;

      case "setTracksInCurrentPlaylist":
        draft.tracksInCurrentPlaylist = action.value;
        break;

      case "triggerPlaylistsRefresh":
        draft.playlistRefreshTrigger = !draft.playlistRefreshTrigger;
        break;

      default:
        throw new Error("The action type doesn't match any case");
    }
  }

  const initialGlobalState = {
    spotifyToken: null,
    isLoggedIn: false,
    userInfo: null,
    currentPlaylist: null,
    tracksInCurrentPlaylist: null,
    playlistsRefreshTrigger: false
  };

  const [appState, appDispatch] = useImmerReducer(
    globalReducer,
    initialGlobalState
  );

  return (
    <DispatchContext.Provider value={appDispatch}>
      <StateContext.Provider value={appState}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/login" />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/login-callback" exact>
              <LoginCallback />
            </Route>
            <Route path="/home" exact>
              {appState.isLoggedIn ? <Home /> : <Redirect to="/login" />}
            </Route>
            <Route path="/error">
              <Error />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </BrowserRouter>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
