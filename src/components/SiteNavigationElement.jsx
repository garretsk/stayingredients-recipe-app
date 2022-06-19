import React from "react";
import NavigationElement from "./NavigationElement";
import { withRouter } from "react-router-dom";

function SiteNavigationElement(props) {

  return (
    <NavigationElement path={props.path}>
      {props.page}
    </NavigationElement>
  );
}

export default withRouter(SiteNavigationElement);
