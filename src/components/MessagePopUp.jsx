import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

export default class MessagePopUp extends Component {

  componentDidMount() {
    setTimeout(this.props.handleClose, this.props.timeout);
  }

  render() {
    return (
      <div className="sig-message-pop-up-bg animate__animated animate__fadeIn animate__fast">
        <div className="sig-message-pop-up">
          <span className="sig-close-message-pop-up" onClick={this.props.handleClose}>&times;</span>
          <div>{this.props.alert}</div>
          <div>More info: <Link className="nav-link" to="/heroku">Deploying StayInGredients with Heroku</Link></div>
        </div>
      </div>
    );
  }
}