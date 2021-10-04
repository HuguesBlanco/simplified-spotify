import React from "react";
import { Link } from "react-router-dom";

import Page from "./Page";

function NotFound() {
  return (
    <Page title="Page not found">
      <p>Page not found</p>
      <p>
        <Link to="/">Go to homepage</Link>
      </p>
    </Page>
  );
}

export default NotFound;
