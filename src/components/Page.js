import React, { useEffect } from "react";

function Page(props) {
  useEffect(() => {
    document.title = `${props.title} | Simplified Spotify`;
  }, [props.title]);

  return (
    <>
      <div className="container-xxl">{props.children}</div>
    </>
  );
}

export default Page;
