import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getTokenInfo } from "../spotifyAuth";

import DispatchContext from "../DispatchContext";

function LoginCallback() {
  const appDispatch = useContext(DispatchContext);

  const history = useHistory();

  useEffect(() => {
    try {
      const token = getTokenInfo();
      appDispatch({ type: "setSpotifyToken", value: token });
      appDispatch({ type: "checkConnection" });
      history.push("/home");
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        throw error;
      }
      history.push("/error");
    }
  });

  return <></>;
}

export default LoginCallback;
