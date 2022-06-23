import React from "react";
import PageTitle from "./PageTitle";

function TermsOfService() {
  return (
    <div className="terms-of-service">
      <div className="container">
        <div className="mask d-flex align-items-center h-100">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                <div className="card" styles="border-radius: 15px;">
                  <div className="card-body p-5">
                    <PageTitle>Terms of Service</PageTitle>
                    <p>StayInGredients is a web application designed to allow users to track what ingredients they have available in their kitchens and search for recipes they can follow using these ingredients. StayInGredients was developed as part of an undergraduate senior capstone project. Creating an account with and using StayInGredients is free. This web application makes use of the Spoonacular API. However, it is not designed to compete with or drive traffic from any of Spoonacular's websites or apps.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;