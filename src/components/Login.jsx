import React, { Component } from "react";
import Expand from "react-expand-animated";
import FormTitle from "./FormTitle";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      uname: "",
      pass: "",
      errors: {},
      expand: false
    };

    this.expand = this.expand.bind(this);
  }

  componentDidMount() {
    this.expand();

    // If logged in and user navigates to Register page, should redirect them to home
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/profile"); // push user to home when they login
      window.location.reload();
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  
  onSubmit = e => {
    e.preventDefault();

    const userData = {
      user_name: this.state.uname,
      password: this.state.psw
    };

    this.props.loginUser(userData);
  };

  expand() {
    this.setState({expand: true});
  }

  render() {
    const { errors } = this.state;

    return (
      <Expand open={this.state.expand}>
        <div className="login">
          <div className="container">
            <div className="mask d-flex align-items-center h-100">
              <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                    <div className="card" styles="border-radius: 15px;">
                      <div className="card-body p-5 gradient-custom-3">
                        <FormTitle>Login</FormTitle>
                        <form noValidate onSubmit={this.onSubmit}>
                          <div className="form-outline mb-4">
                            <input 
                              type="text" 
                              className={classnames("", {
                                invalid: errors.uname || errors.UsernameNotFound
                              })}
                              placeholder="Username" 
                              onChange={this.onChange}
                              value={this.state.uname}
                              error={errors.uname}
                              id="uname"/>
                              <label htmlFor="uname"></label>
                              <span className="red-text" style={{color: "red", background: "white", fontWeight: "bold"}}>
                                {errors.uname}
                                {errors.UsernameNotFound}
                              </span>
                          </div>

                          <div className="form-outline mb-4">
                            <input 
                              type="password" 
                              className={classnames("", {
                                invalid: errors.pass || errors.PasswordIncorrect
                              })} 
                              placeholder="Password" 
                              onChange={this.onChange}
                              value={this.state.psw}
                              error={errors.psw}
                              id="psw"/>
                              <label htmlFor="uname"></label>
                              <span className="red-text" style={{color: "red", background: "white", fontWeight: "bold"}}>
                                {errors.pass}
                                {errors.PasswordIncorrect}
                              </span>
                          </div>
                          
                          <div className="form-check d-flex mb-5">
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              value=""
                              id="remember-me-checkbox"
                            />
                            <label className="form-check-label" htmlFor="remember-me-checkbox">
                              Remember me
                            </label>
                          </div>

                          <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Login</button>
                          </div>

                          <p className="text-center text-muted mt-5 mb-0">Don't have an account? <Link style={{color: 'black'}} to="/register">Register here</Link></p>
                        </form>
                      </div>
                    </div>
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));