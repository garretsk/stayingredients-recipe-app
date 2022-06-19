import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header, Footer, Home, About, Contact, Login, Register, TermsOfService, MyPantry, ShoppingList, SavedRecipes, SearchRecipes, Profile } from "./components";
import PrivateRoute from "./components/private-route/PrivateRoute";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

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