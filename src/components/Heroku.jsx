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
              <p>StayInGredients was created as part of an undergraduate capstone. Due to budgetary contraints, we used Vercel to deploy our frontend and <a href="https://devcenter.heroku.com/articles/free-dyno-hours" target="_blank" rel="noopener noreferrer">'free dyno hours'</a> from Heroku to deploy our backend. In order to save dyno hours, the dyno sleeps until it receives traffic, which wakes it up. It returns to sleep after a period of inactivity. While our server is starting, you may notice any operations that involve requests to the backend being delayed. Performance returns to normal levels after the server wakes. This process occurs automatically once a user visits StayInGredients and generally takes around 15 seconds.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Heroku;