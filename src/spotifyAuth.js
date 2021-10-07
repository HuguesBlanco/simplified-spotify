/*
Spotify Auth through Implicit Grant Flow
https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow
*/

const stateKey = "spotify_auth_state";

/**
 * Generate the URL to make a oauth connection to Spotify.
 * @returns {string} The URL.
 */
function createConnectionUrl() {
  // Parameters
  const url = "https://accounts.spotify.com/authorize";
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const responseType = "token";
  const redirectUri = "http://localhost:3000/login-callback";
  const scope = [
    "playlist-read-private", // Playlist component
    "playlist-read-collaborative" // Playlist component
  ];

  // State parameter
  const state = generateRandomString(16);
  localStorage.setItem(stateKey, state);

  // URL Assembly
  const SpotifyConnectUrl = new URL(url);
  SpotifyConnectUrl.searchParams.set("client_id", clientId);
  SpotifyConnectUrl.searchParams.set("response_type", responseType);
  SpotifyConnectUrl.searchParams.set("redirect_uri", redirectUri);
  SpotifyConnectUrl.searchParams.set("scope", scope.join(" "));
  SpotifyConnectUrl.searchParams.set("state", state);

  return SpotifyConnectUrl.toString();
}

/**
 * Return everything about the token to access to Spotify API (token included).
 * @typedef {Object} TokenInfo The token and the information related to it.
 * @property {string} access_token The token to access Spotify API.
 * @property {string} expires_in Time before the token expires.
 * @property {string} state The state sent with the token demand.
 * @property {string} token_type Type of the token.
 * @property {Date} creationDate Creation date of the token.
 * @returns {TokenInfo} The token and all informations link to it.
 */
function getTokenInfo() {
  // Recover and format returned parameters
  const organisedUrl = new URL(window.location.href);

  const urlHash = organisedUrl.hash.substring(1);
  const regex = /([^&;=]+)=?([^&;]*)/g;
  const [...params] = urlHash.matchAll(regex);

  const organisedParams = params.reduce((orgParams, param) => {
    orgParams[param[1]] = param[2];

    return orgParams;
  }, {});

  // Check that have all the parametters
  const paramRequired = ["access_token", "expires_in", "state", "token_type"];
  const paramPossessed = Object.keys(organisedParams);

  function sortAlphabetically(arrayToSort) {
    return [...arrayToSort].sort((a, b) => a.localeCompare(b));
  }

  const paramRequiredSorted = sortAlphabetically(paramRequired);
  const paramPossessedSorted = sortAlphabetically(paramPossessed);

  if (paramRequiredSorted.toString() !== paramPossessedSorted.toString()) {
    throw new Error(
      "The URL doesn't contain the required authentification parameters"
    );
  }

  // State verification
  const sentState = localStorage.getItem(stateKey);
  const recievedState = organisedParams.state;

  if (recievedState !== sentState) {
    throw new Error(
      "The state sent for oauth authentification is different to the state recieve with the token"
    );
  }

  // Convert key to camel case
  function snakeToCamelCase(str) {
    const regex = /_\w/g;
    function handling(match) {
      return match.substring(1).toUpperCase();
    }

    return str.replace(regex, handling);
  }

  const tokenInfo = Object.entries(organisedParams).reduce((allInfo, info) => {
    const key = snakeToCamelCase(info[0]);
    const value = info[1];
    allInfo[key] = value;
    return allInfo;
  }, {});

  // Add creation time
  tokenInfo.creationTime = new Date();

  return tokenInfo;
}

/**
 * Generates a random string containing numbers and letters.
 * @param  {number} length The length of the string.
 * @return {string} The generated string.
 */
function generateRandomString(length) {
  var RandomString = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    RandomString += possible.charAt(
      Math.floor(Math.random() * possible.length)
    );
  }

  return RandomString;
}

export { createConnectionUrl, getTokenInfo };
