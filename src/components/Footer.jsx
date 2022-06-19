import React from "react";
import BackToTop from "./BackToTopButton";
import FooterNavigationElement from "./FooterNavigationElement";
import StayInGredientsLogo from "../StayInGredientsLogo.png";
import { withRouter } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <footer className="text-center mx-3 my-5">
        <img className="mt-3 mb-2" alt="StayInGredients Logo" width="80" height="24" src={StayInGredientsLogo}/>
        <small className="d-block mb-3 text-muted">&copy; 2021-2022</small>
        <ul className="navbar-nav ml-auto mb-2">
          <FooterNavigationElement page="About" path="/about"></FooterNavigationElement>
          <FooterNavigationElement page="Contact" path="/contact"></FooterNavigationElement>
          <FooterNavigationElement page="Terms of Service" path="/terms-of-service"></FooterNavigationElement>
        </ul>
        <BackToTop />
      </footer>
    </div>
  );
}

export default withRouter(Footer);