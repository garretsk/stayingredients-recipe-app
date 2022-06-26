import React from "react";
import PageTitle from "./PageTitle";

function Heroku() {
  return (
    <div className="about">
      <div className="container">
        <div className="card m-3" styles="border-radius: 15px;">
          <div className="card-body">
            <PageTitle>Deploying StayInGredients with Heroku</PageTitle>
            <div className="row align-items-center my-5">
              <p>StayInGredients was created as part of an undergraduate capstone. Due to budgetary contraints, we used Vercel to deploy our frontend application and Heroku to deploy our backend application. Heroku provides a limited number of <a href="https://devcenter.heroku.com/articles/free-dyno-hours" target="_blank" rel="noopener noreferrer">'free dyno hours'</a> on a monthly basis. We used these free hours from Heroku to host our backend server. In order to save dyno hours, the dyno sleeps while it is not receiving traffic. Upon receiving traffic, the dyno wakes up. It returns to sleep after a period of inactivity. While our server is starting, you may notice any operations that involve requests to the backend being delayed. Performance returns to normal levels after the server wakes. This process occurs automatically if a user visits StayInGredients while the server is sleeping and generally takes around 15 seconds.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Heroku;