import React from "react";
import PageTitle from "./PageTitle";
import StayInGredientsLogo from "../StayInGredientsLogo.png";

function About() {
  return (
    <div className="about">
      <div className="container">
        <div className="card m-3" styles="border-radius: 15px;">
          <div className="card-body">
            <PageTitle>About</PageTitle>
            <div className="row align-items-center my-5">
              <div className="col-lg-7">
                <img
                  className="img-fluid rounded mb-4 mb-lg-0 sig-heading"
                  src={StayInGredientsLogo}
                  alt="StayInGredientsLogo"
                />
              </div>
              <div className="col-lg-5">
                <p>
                  StayInGredients’ main purpose is to provide a list of recipes that users can readily make from their kitchens. This web application will ask users for ingredients they already have and will return recipes that can be made with those ingredients. StayInGredient also provides the user with the ability to save any recipes the user likes. StayInGredients will also help you keep track of what you have in your kitchen. With the simple press of a button users will instantly add missing ingredients to a shopping list for easy and streamlined shopping.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;