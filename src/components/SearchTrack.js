import React, { useContext, useEffect } from "react";
import { useImmer } from "use-immer";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import StateContext from "../StateContext";

import DisplayTracksFound from "./DisplayTracksFound";

function SearchTrack() {
  const appState = useContext(StateContext);

  const history = useHistory();

  const [search, setSearch] = useImmer({
    isActive: false,
    termTyped: "",
    validatedTerm: "",
    isWaintingForResponse: false,
    spotifyApiResponse: null
  });

  function activateSearch() {
    setSearch((draft) => {
      draft.isActive = true;
    });
  }

  function desactivateSearch() {
    setSearch((draft) => {
      draft.isActive = false;
    });
  }

  function handleSearchInput(event) {
    setSearch((draft) => {
      draft.termTyped = event.target.value;
    });
  }

  // Validate search term if typing stop for a moment.
  useEffect(() => {
    const validatedSearch = setTimeout(() => {
      setSearch((draft) => {
        draft.validatedTerm = search.termTyped;
      });
    }, 700);

    return () => {
      clearTimeout(validatedSearch);
    };
  }, [search.termTyped, setSearch]);

  // Call Spotify Search API when term is validated.
  // Spotify API documentation to search items: https://developer.spotify.com/documentation/web-api/reference/#endpoint-search
  useEffect(() => {
    if (search.validatedTerm !== "") {
      setSearch((draft) => {
        draft.isWaintingForResponse = true;
      });

      const searchRequestCancelToken = Axios.CancelToken.source();

      Axios.get("https://api.spotify.com/v1/search", {
        cancelToken: searchRequestCancelToken.token,
        headers: {
          Authorization: `${appState.spotifyToken.tokenType} ${appState.spotifyToken.accessToken}`
        },
        params: {
          q: search.validatedTerm,
          type: "track"
        }
      })
        .then((response) => {
          setSearch((draft) => {
            draft.isWaintingForResponse = false;
            draft.spotifyApiResponse = response.data;
          });
          console.log(response.data);
        })
        .catch((error) => {
          if (process.env.NODE_ENV === "development") {
            throw error;
          }
        });

      return () => {
        searchRequestCancelToken.cancel(
          "Request to Spotify Search API canceled because another one was sent before receiving the response of the first one"
        );
      };
    } else {
      setSearch((draft) => {
        draft.spotifyApiResponse = null;
      });
    }
  }, [
    appState.spotifyToken.accessToken,
    appState.spotifyToken.tokenType,
    history,
    search.validatedTerm,
    setSearch
  ]);

  return (
    <div className="col-lg-8">
      <div className="form-floating">
        <input
          id="searchInput"
          className="form-control"
          type="text"
          autoComplete="off"
          placeholder="The track I search for"
          value={search.termTyped}
          onChange={handleSearchInput}
          onFocus={activateSearch}
          onBlur={desactivateSearch}
        />
        <label htmlFor="searchInput">Search for a track</label>
      </div>
      {search.isActive ? <DisplayTracksFound search={search} /> : ""}
    </div>
  );
}

export default SearchTrack;
