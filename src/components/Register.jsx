import React, { Component } from "react";
import Expand from "react-expand-animated";
import FormTitle from "./FormTitle";
import TermsOfServicePopUp from "./TermsOfServicePopUp";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      uname: "",
      email: "",
      psw: "",
      repsw: "",
      errors: {},
      agreeToTerms: false,
      termsPopUpVisable: false,
      expand: false
    };

    this.toggleTermsPopUpVisability = this.toggleTermsPopUpVisability.bind(this);
    this.toggleTermsCheckbox = this.toggleTermsCheckbox.bind(this);
    this.agreeToTermsPopUp = this.agreeToTermsPopUp.bind(this);
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

    const newUser = {
      first_name: this.state.fname,
      last_name: this.state.lname,
      user_name: this.state.uname,
      email: this.state.email,
      password: this.state.psw,
      password2: this.state.repsw
    };

    this.props.registerUser(newUser, this.props.history);
  };

  toggleTermsPopUpVisability() {
    this.setState((state) => ({
      termsPopUpVisable: !state.termsPopUpVisable
    }));
  }

  toggleTermsCheckbox() {
    this.setState((state) => ({
      agreeToTerms: !state.agreeToTerms
    }));
  }

  agreeToTermsPopUp() {
    this.setState({
      termsPopUpVisable: false
    });

    this.setState({
      agreeToTerms: true
    });
  }

  expand() {
    this.setState({expand: true});
  }

  render() {
    const { errors } = this.state;

    return (
      <Expand open={this.state.expand}>
        <div className="register">
          <div className="container">
            <div className="mask d-flex align-items-center h-100">
              <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                    <div className="card" styles="border-radius: 15px;">
                      <div className="card-body p-5 gradient-custom-3">
                        <FormTitle>Create an Account</FormTitle>
                        <form noValidate onSubmit={this.onSubmit}>

                          <div className="form-outline mb-4">
                            <input 
                              type="text" 
                              className={classnames("", {
                                invalid: errors.fname
                              })} 
                              placeholder="First Name" 
                              id="fname" 
                              value={this.state.fname} 
                              error={errors.fname}
                              onChange={this.onChange}/>
                              <label htmlFor="fname"></label>
                              <span className="red-text">{errors.fname}</span>
                          </div>

                          <div className="form-outline mb-4">
                            <input 
                              type="text" 
                              className={classnames("", {
                                invalid: errors.lname
                              })} 
                              placeholder="Last Name" 
                              id="lname" 
                              value={this.state.lname} 
                              error={errors.lname}
                              onChange={this.onChange}/>
                              <label htmlFor="lname"></label>
                              <span className="red-text">{errors.lname}</span>
                          </div>

                          <div className="form-outline mb-4">
                            <input 
                              type="email" 
                              className={classnames("", {
                                invalid: errors.email || errors.EmailExists
                              })} 
                              placeholder="Email" 
                              id="email" 
                              value={this.state.email} 
                              error={errors.email}
                              onChange={this.onChange}/>
                              <label htmlFor="email"></label>
                              <span className="red-text" style={{color: 'red', background: 'white', fontWeight: 'bold'}}>
                                {errors.email}
                                {errors.EmailExists}
                              </span>
                          </div>

                          <div className="form-outline mb-4">
                            <input 
                              type="text" 
                              className={classnames("", {
                                invalid: errors.uname || errors.UsernameExists
                              })} 
                              placeholder="Create Username" 
                              id="uname" 
                              value={this.state.uname}
                              error={errors.uname} 
                              onChange={this.onChange}/>
                              <label htmlFor="uname"></label>
                              <span className="red-text" style={{color: 'red', background: 'white', fontWeight: 'bold'}}>
                                {errors.uname}
                                {errors.UsernameExists}
                              </span>
                          </div>

                          <div className="form-outline mb-4">
                            <input 
                              type="password" 
                              className={classnames("", {
                                invalid: errors.psw
                              })} 
                              placeholder="Enter Password" 
                              id="psw" 
                              value={this.state.psw}
                              error={errors.psw} 
                              onChange={this.onChange}/>
                              <label htmlFor="psw"></label>
                              <span className="red-text">{errors.psw}</span>
                          </div>

                          <div className="form-outline mb-4">
                            <input 
                              type="password" 
                              className={classnames("", {
                                invalid: errors.repsw
                              })} 
                              placeholder="Re-enter Password" 
                              id="repsw" 
                              value={this.state.repsw}
                              error={errors.repsw} 
                              onChange={this.onChange}/>
                              <label htmlFor="repsw"></label>
                              <span className="red-text">{errors.repsw}</span>
                          </div>

                          <div className="form-check d-flex mb-5 form-inline">
                            <input onChange={this.toggleTermsCheckbox} className="form-check-input me-2" type="checkbox" value="" id="terms-of-service-checkbox" checked={this.state.agreeToTerms} required/>
                            <span className="form-check-label ml-2" htmlFor="terms-of-service-checkbox">
                              <span onClick={this.toggleTermsCheckbox}>I agree with the </span>
                              <span style={{textDecoration: 'underline', color: 'black', cursor: "pointer"}} onClick={this.toggleTermsPopUpVisability}>Terms of Service</span>
                            </span>
                          </div>

                          <div className="d-flex justify-content-center">
                            <button type="submit" value="Create User" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                          </div>

                          <p className="text-center text-muted mt-5 mb-0">Already have an account? <Link style={{color: 'black'}} to="/login">Login here</Link></p>
                        </form>
                        {this.state.termsPopUpVisable && 
                          <TermsOfServicePopUp handleClose={this.toggleTermsPopUpVisability} onAgree={this.agreeToTermsPopUp}/>
                        }
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));