import React, { Component } from "react";
import PageTitle from "./PageTitle";
import StayInGredientsLogo from "../StayInGredientsLogo.png";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import jwt_decode from "jwt-decode";
import Expand from "react-expand-animated";

class Profile extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    const name = decoded.uname;

    this.state = {
      expand: false,
      firstName: "",
      lastName: "",
      email: ""
    };

    this.expand = this.expand.bind(this);
    this.retrieveUserInfo = this.retrieveUserInfo.bind(this);
  }

  expand() {
    this.setState({expand: true});
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    window.location.reload();
  };

  retrieveUserInfo() {
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    const name = decoded.uname;

    console.log(token);
    console.log(decoded);
    console.log(name);

    fetch("http://localhost:5000/api/users/getUserInfo/" + name)
      .then(response => response.json())
      .then((res) => {
        console.log("USER_INFO: " + res);
        
        this.setState({
          firstName: res.first_name,
          lastName: res.last_name,
          email: res.email
        });
      })
      .catch(error => {
        window.alert(error);
        return;
      });
  }

  componentDidMount() {
    this.expand();
    setTimeout(this.retrieveUserInfo, 500);
  }

  render() {
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    const name = decoded.uname;

    return (
      <Expand open={this.state.expand}>
      <div className="profile">
        <div className="container">
          <div className="card m-3" styles="border-radius: 15px;">
            <div className="card-body">
              <div className="row align-items-center my-5">
                <div className="col-lg-7">
                  <br/><br/><br/>
                  <h3>
                    <b>Hey there, {name}!</b>
                  </h3>
                  <div className="d-flex justify-content-center">
                    <button type="submit" 
                      className="btn btn-success btn-block btn-lg gradient-custom-4 text-body mt-3"
                      onClick={this.onLogoutClick}>
                      Logout
                    </button>
                  </div>
                </div>
                <div className="col-lg-7">
                <img
                  className="img-fluid rounded mb-4 mb-lg-0 sig-heading"
                  src={StayInGredientsLogo}
                  alt="StayInGredientsLogo"
                />
                </div>
                <div className="col-lg-5">
                  <h5><b>Username: </b>{name}</h5>
                  <h5><b>First name: </b>{this.state.firstName}</h5>
                  <h5><b>Last name: </b>{this.state.lastName}</h5>
                  <h5><b>Email: </b>{this.state.email}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Expand>
    );
  }
}

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Profile);