import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <>
      <p>There was an error</p>
      <p>
        <Link to="/">Go to homepage</Link>
      </p>
    </>
  );
}

export default Error;
