import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header, Footer, Home, About, Contact, Login, Register, TermsOfService, MyPantry, ShoppingList, SavedRecipes, SearchRecipes, Profile } from "./components";
import PrivateRoute from "./components/private-route/PrivateRoute";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";
import { get } from "mongoose";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  // const currentTime = Date.now() / 1000; // to get in milliseconds
  // if (decoded.exp < currentTime) {
  //   // Logout user
  //   store.dispatch(logoutUser());
  //   // Redirect to login
  //   window.location.href = "./login";
  // }
}

class App extends Component {

  componentDidMount() {

    // Send GET request to Heroku server to make sure it is awake
    let responseReceived = false;
    let alertSent = false;

    setTimeout(() => {
      if(!responseReceived) {
        alertSent = true;
        window.alert("Our Heroku server is starting. StayInGredients was created as part of an undergraduate capstone. Due to budgetary contraints, we used Vercel to deploy our frontend and 'free dyno hours' from Heroku to deploy our backend. In order to save dyno hours, the dyno sleeps until it receives traffic, which wakes it up. It returns to sleep after a period of inactivity. While our server is starting, you may notice any operations that involve requests to the backend being delayed. Performance will return to normal levels after the server wakes. This process occurs silently within about 15 seconds and requires no action from the user. For more info visit: https://devcenter.heroku.com/articles/free-dyno-hours");
      }
    }, 3000);

    fetch("https://stayingredients-backend.herokuapp.com/wake")
    .then((res) => res.json())
    .then((res) => {
      if("server awake" == res.status) {
        responseReceived = true;
        console.log("Server awake");
        if(alertSent) {
          window.alert("Our Heroku server is now up and running!");
        }
      }
      else {
        console.log(res);
      }
    })
    .catch(error => {
      window.alert(error);
    });
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <Header />
            <Switch>
              <Route path="/" exact component={() => <Home />} />
              <Route path="/about" exact component={() => <About />} />
              <Route path="/contact" exact component={() => <Contact />} />
              <Route path="/login" exact component={() => <Login />} />
              <Route path="/register" exact component={() => <Register />} />
              <Route path="/terms-of-service" exact component={() => <TermsOfService />} />
              <PrivateRoute path="/my-pantry" exact component={() => <MyPantry />} />
              <PrivateRoute path="/shopping-list" exact component={() => <ShoppingList />} />
              <Route path="/saved-recipes" exact component={() => <SavedRecipes />} />
              <Route path="/search-recipes" exact component={() => <SearchRecipes />} />
              <PrivateRoute path="/profile" exact component={() => <Profile />} />
            </Switch>
            <Footer />
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;