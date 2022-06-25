import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header, Footer, Home, About, Contact, Login, Register, TermsOfService, MyPantry, ShoppingList, SavedRecipes, SearchRecipes, Profile } from "./components";
import PrivateRoute from "./components/private-route/PrivateRoute";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import MessagePopUp from "./components/MessagePopUp";
import PublicPantry from "./components/PublicPantry";
import PublicShoppingList from "./components/PublicShoppingList";
import Heroku from "./components/Heroku";

import { Link } from "react-router-dom";
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

const HEROKU_SERVER_MESSAGE = <span>Our Heroku server is starting. Some features may be delayed until this is done. More info: <Link className="nav-link" to="/heroku">Deploying StayInGredients with Heroku</Link></span>;
const SERVER_AWAKE_MESSAGE = <span>Our Heroku server is now up and running!</span>;

class App extends Component {
    constructor(props) {
    super(props);

    this.state = {
      herokuServerMessageVisable: false,
      serverAwakeMessageVisable: false
    };

    this.showHerokuServerMessage = this.showHerokuServerMessage.bind(this);
    this.removeHerokuServerMessage = this.removeHerokuServerMessage.bind(this);
    this.showServerAwakeMessage = this.showServerAwakeMessage.bind(this);
    this.removeServerAwakeMessage = this.removeServerAwakeMessage.bind(this);
  }

  showHerokuServerMessage() {
    this.setState({herokuServerMessageVisable: true});
  }

  removeHerokuServerMessage() {
    this.setState({herokuServerMessageVisable: false});
  }

  showServerAwakeMessage() {
    this.setState({serverAwakeMessageVisable: true});
  }

  removeServerAwakeMessage() {
    this.setState({serverAwakeMessageVisable: false});
  }

  componentDidMount() {
    this.showHerokuServerMessage();/////// TEMP

    // Send GET request to Heroku server to make sure it is awake
    let responseReceived = false;
    let alertSent = false;

    setTimeout(() => {
      if(!responseReceived) {
        alertSent = true;
        this.showHerokuServerMessage();
      }
    }, 3000);

    fetch("https://stayingredients-backend.herokuapp.com/wake")
    .then((res) => res.json())
    .then((res) => {
      if("server awake" == res.status) {
        responseReceived = true;
        console.log("Server awake");
        if(alertSent) {
          this.showServerAwakeMessage();
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
              <Route path="/" exact component={() => <Home/>} />
              <Route path="/about" exact component={() => <About/>} />
              <Route path="/contact" exact component={() => <Contact/>} />
              <Route path="/login" exact component={() => <Login/>} />
              <Route path="/register" exact component={() => <Register/>} />
              <Route path="/terms-of-service" exact component={() => <TermsOfService/>} />
              <PrivateRoute path="/my-pantry" exact component={() => <MyPantry/>} />
              <PrivateRoute path="/shopping-list" exact component={() => <ShoppingList/>} />
              <PrivateRoute path="/saved-recipes" exact component={() => <SavedRecipes/>} />
              <Route path="/search-recipes" exact component={() => <SearchRecipes/>} />
              <PrivateRoute path="/profile" exact component={() => <Profile/>} />
              <Route path="/public-pantry/:username" exact component={() => <PublicPantry/>} />
              <Route path="/public-shopping-list/:username" exact component={() => <PublicShoppingList/>} />
              <Route path="/heroku" exact component={() => <Heroku/>} />
            </Switch>
            <Footer />
          </Router>
          {this.state.herokuServerMessageVisable && 
            <MessagePopUp alert={HEROKU_SERVER_MESSAGE} handleClose={this.removeHerokuServerMessage} timeout={10000}/>
          }
          {this.state.serverAwakeMessageVisable &&
            <MessagePopUp alert={SERVER_AWAKE_MESSAGE} handleClose={this.removeServerAwakeMessage} timeout={10000}/>
          }
        </div>
      </Provider>
    );
  }
}

export default App;