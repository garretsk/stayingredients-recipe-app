import React from "react";

function FormTitle(props) {
  return (
    <h2 className="mb-5 text-uppercase text-center sig-heading">
      {props.children}
    </h2>
  );
}

export default FormTitle;