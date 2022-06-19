import React from "react";
import NavigationElement from "./NavigationElement";
import { withRouter } from "react-router-dom";

function FooterNavigationElement(props) {

  return (
    <NavigationElement path={props.path}>
      <span className="text-muted">{props.page}</span>
    </NavigationElement>
  );
}

export default withRouter(FooterNavigationElement);
