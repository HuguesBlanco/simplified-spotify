import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useImmerReducer } from "use-immer";

// Context
import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

// Components
import Connection from "./components/Connection";
import Home from "./components/Home";

function App() {
  // Context
  function globalStateReducer(draft, action) {
    switch (action.type) {
      case "setToken":
        draft.apiToken = action.value;
        break;
      default:
        throw new Error("The action type doesn't match any case");
    }
  }

  const initialGlobalState = { apiToken: null };

  const [globalState, globalDispatch] = useImmerReducer(
    globalStateReducer,
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
