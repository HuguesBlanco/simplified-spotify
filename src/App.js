import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useImmerReducer } from "use-immer";

import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

import Connection from "./components/Connection";
import Home from "./components/Home";

function App() {
  // Context
  function globalReducer(draft, action) {
    switch (action.type) {
      case "setSpotifyToken":
        draft.spotifyToken = action.value;
        break;
      default:
        throw new Error("The action type doesn't match any case");
    }
  }

  const initialGlobalState = { spotifyToken: null };

  const [globalState, globalDispatch] = useImmerReducer(
    globalReducer,
    initialGlobalState
  );

  // Router
  return (
    <DispatchContext.Provider value={globalDispatch}>
      <StateContext.Provider value={globalState}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <Connection />
            </Route>
            <Route path="/home" exact>
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
