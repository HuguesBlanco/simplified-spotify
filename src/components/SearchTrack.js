import React, { useContext, useEffect, useRef } from "react";
import { useOnClickOutsideElement } from "../customHooks";
import { useImmer } from "use-immer";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import StateContext from "../StateContext";

import SearchItems from "./SearchItems";

function SearchTrack() {
  const history = useHistory();

  const appState = useContext(StateContext);

  const [search, setSearch] = useImmer({
    isActive: false,
    termTyped: "",
    validatedTerm: "",
    isWaintingForResponse: false,
    spotifyApiResponse: null
  });

  function handleSearchInput(event) {
    setSearch((draft) => {
      draft.termTyped = event.target.value;
    });
  }

  function activateSearch() {
    setSearch((draft) => {
      draft.isActive = true;
    });
  }

  function deactivateSearch() {
    setSearch((draft) => {
      draft.isActive = false;
    });
  }

  // Close search when click outside the component.
  const searchComponentRef = useRef(null);
  useOnClickOutsideElement(searchComponentRef.current, deactivateSearch);

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
    <div className="col-lg-8" ref={searchComponentRef}>
      <div className="form-floating">
        <input
          id="searchInput"
          className="form-control"
          type="text"
          autoComplete="off"
          placeholder="The song I'm searching for"
          value={search.termTyped}
          onChange={handleSearchInput}
          onFocus={activateSearch}
        />
        <label htmlFor="searchInput">Search for a track</label>
      </div>
      {search.isActive && <SearchItems search={search} />}
    </div>
  );
}

export default SearchTrack;
