import React, { Component } from "react";
import StayInGredientsLogo from "../StayInGredientsLogo.png";
import AccountNavigationElement from "./AccountNavigationElement";
import SiteNavigationElement from "./SiteNavigationElement";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile: false,
      mobileOpen: false
    };
  }

  render() {

    let navigationList = [];

    if (localStorage.jwtToken) {
      navigationList.push(<SiteNavigationElement key="1" page="Home" path="/"></SiteNavigationElement>);
      navigationList.push(<SiteNavigationElement key="2" page="Search Recipes" path="/search-recipes"></SiteNavigationElement>);
      navigationList.push(<SiteNavigationElement key="3" page="Shopping List" path="/shopping-list"></SiteNavigationElement>);
      navigationList.push(<SiteNavigationElement key="4" page="My Pantry" path="/my-pantry"></SiteNavigationElement>);
      navigationList.push(<SiteNavigationElement key="5" page="Saved Recipes" path="/saved-recipes"></SiteNavigationElement>);
      navigationList.push(<AccountNavigationElement key="6" page="Profile" path="/profile"></AccountNavigationElement>);
    }
    else {
      navigationList.push(<SiteNavigationElement key="1" page="Home" path="/"></SiteNavigationElement>);
      navigationList.push(<SiteNavigationElement key="2" page="Search Recipes" path="/search-recipes"></SiteNavigationElement>);
      navigationList.push(<AccountNavigationElement key="3" page="Login" path="/login"></AccountNavigationElement>);
      navigationList.push(<AccountNavigationElement key="4" page="Register" path="/register"></AccountNavigationElement>);
    }

    return (
      <div className="navigation">
        <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light shadow p-2 mb-5">
          <a className="navbar-brand mt-1 mb-auto" href="/">
            <img
              className="rounded mb-4 mb-lg-0"
              height="50px"
              width="160px"
              src={StayInGredientsLogo}
              alt="StayInGredientsLogo"
            />
          </a>
          <div className="ml-auto">
            <button className="navbar-toggler float-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon ml-auto"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav ml-auto">
                {navigationList}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
