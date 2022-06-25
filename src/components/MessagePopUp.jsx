import React, { Component } from "react";

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
        </div>
      </div>
    );
  }
}