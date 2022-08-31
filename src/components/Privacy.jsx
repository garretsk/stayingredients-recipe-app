import React from "react";
import PageTitle from "./PageTitle";

function Privacy() {
  return (
    <div className="privacy">
      <div className="container">
        <div className="mask d-flex align-items-center h-100">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                <div className="card" styles="border-radius: 15px;">
                  <div className="card-body p-5">
                    <PageTitle>Privacy</PageTitle>
                    <p>If you create an account, you provide us with personal information such as your name, email, a username, and a password. This data is used for creating and managing user accounts. It is not shared with any third parties. Passwords are encrypted and are not stored on our servers.</p>
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

export default Privacy;