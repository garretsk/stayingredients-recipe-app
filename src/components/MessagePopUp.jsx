import React, { Component } from "react";

const TIMOUT = 5000;

export default class MessagePopUp extends Component {

  componentDidMount() {
    setTimeout(this.props.handleClose, TIMOUT);
  }

  render() {
    return (
      <div className="sig-message-pop-up-bg animate__animated animate__fadeIn animate__fast">
        <div className="sig-message-pop-up">
          <span className="sig-close-message-pop-up" onClick={this.props.handleClose}>&times;</span>
          <h6>{this.props.alert}</h6>
        </div>
      </div>
    );
  }
}