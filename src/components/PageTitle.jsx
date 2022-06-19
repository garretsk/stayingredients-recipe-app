import React from "react";

function PageTitle(props) {
  return (
    <h1 className="font-weight-light text-center sig-heading">
      {props.children}
    </h1>
  );
}

export default PageTitle;