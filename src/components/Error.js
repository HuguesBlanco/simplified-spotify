import React from "react";
import { Link } from "react-router-dom";

import Page from "./Page";

function Error() {
  return (
    <Page title="Error">
      <p>There was an error</p>
      <p>
        <Link to="/">Go to homepage</Link>
      </p>
    </Page>
  );
}

export default Error;
