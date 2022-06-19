import React, { Component } from "react";

export default class TermsOfServicePopUp extends Component {
  
  render() {
    return (
      <div className="sig-terms-pop-up-bg">
        <div className="sig-terms-pop-up">
          <span className="sig-close-terms-pop-up" onClick={this.props.handleClose}>&times;</span>
          <h3>Terms of Service</h3>
          <p>We reserve the right to steal your data and sell it. We reserve the right to steal your data and sell it. We reserve the right to steal your data and sell it. We reserve the right to steal your data and sell it. We reserve the right to steal your data and sell it. We reserve the right to steal your data and sell it.</p>
          <p>We reserve the right to steal your data and sell it.</p>
          <p>We reserve the right to steal your data and sell it.</p>
          <p>We reserve the right to steal your data and sell it.</p>
          <p>We reserve the right to steal your data and sell it.</p>
          <p>We reserve the right to steal your data and sell it.</p>
          <p>We reserve the right to steal your data and sell it.</p>
          <p>We reserve the right to steal your data and sell it.</p>
          <p>We reserve the right to steal your data and sell it.</p>
          <p>We reserve the right to steal your data and sell it.</p>
          <p>We reserve the right to steal your data and sell it.</p>
          <button className="btn btn-success w-100" onClick={this.props.onAgree}>I Agree</button>
        </div>
      </div>
    );
  }
}