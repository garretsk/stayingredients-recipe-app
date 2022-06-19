import React, { Component } from "react";

const TIMEOUT = 2000;
let myTimeout;

export default class StatusPopUp extends Component {

  render() {
    clearTimeout(myTimeout);
    myTimeout = setTimeout(this.props.handleClose, TIMEOUT);

    return (
      <div className="fixed-bottom animate__animated animate__fadeIn animate__fast" style={{width: 'wrap-content'}}>
        <h6 className="p-1 mb-5 mx-5 border border-secondary rounded-lg bg-light text-muted">{this.props.alert}</h6>
      </div>
    );
  }
}