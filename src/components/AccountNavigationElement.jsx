import React from "react";
import NavigationElement from "./NavigationElement";
import { withRouter } from "react-router-dom";

function AccountNavigationElement(props) {

  return (
    <NavigationElement path={props.path}>
      <b className="text-primary">{props.page}</b>
    </NavigationElement>
  );
}

export default withRouter(AccountNavigationElement);
