import React from "react";
import { Link, withRouter } from "react-router-dom";

function NavigationElement(props) {

  return (
    <li
      className={`nav-item  ${
        props.location.pathname === props.path ? "active" : ""
      }`}
    >
      <Link className="nav-link" to={props.path}>
        {props.children}
      </Link>
    </li>
  );
}

export default withRouter(NavigationElement);
