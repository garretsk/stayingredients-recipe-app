import React, { Component } from "react";

export default class TermsOfServicePopUp extends Component {
  
  render() {
    return (
      <div className="sig-terms-pop-up-bg">
        <div className="sig-terms-pop-up">
          <span className="sig-close-terms-pop-up" onClick={this.props.handleClose}>&times;</span>
          <h3>Terms of Service</h3>
          <p>StayInGredients is a web application designed to allow users to track what ingredients they have available in their kitchens and search for recipes they can follow using these ingredients. StayInGredients was developed as part of an undergraduate senior capstone project. Creating an account with and using StayInGredients is free. This web application makes use of the Spoonacular API. However, it is not designed to compete with or drive traffic from any of Spoonacular's websites or apps.</p>
          <button className="btn btn-success w-100" onClick={this.props.onAgree}>I Agree</button>
        </div>
      </div>
    );
  }
}