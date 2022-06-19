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
                    <p>
                      We reserve the right to steal your data and sell it.
                    </p>
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