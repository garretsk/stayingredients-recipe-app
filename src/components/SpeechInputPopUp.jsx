import React, { Component } from "react";

const listeningIntervalLength = 500;
let listeningInterval;

export default class SpeechInputPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frame: 0
    };

    this.changeFrame = this.changeFrame.bind(this);
  }

  changeFrame() {
    this.setState(function(state) {
      let tempFrame;
      if(3 === state.frame) {
        tempFrame = 0;
      }
      else {
        tempFrame = state.frame + 1;
      }
      return {frame: tempFrame};
    });
  }

  componentDidMount() {
    listeningInterval = setInterval(this.changeFrame, listeningIntervalLength);
  }

  componentWillUnmount() {
    clearInterval(listeningInterval);
  }

  render() {
    let listeningFrame;
    if(0 === this.state.frame) {
      listeningFrame = <span>Listening</span>;
    }
    else if(1 === this.state.frame) {
      listeningFrame = <span>Listening.</span>;
    }
    else if(2 === this.state.frame) {
      listeningFrame = <span>Listening..</span>;
    }
    else if(3 === this.state.frame) {
      listeningFrame = <span>Listening...</span>;
    }

    return (
      <div className="sig-speech-pop-up-bg">
        <div className="sig-speech-pop-up-outside" onClick={this.props.handleClose}></div>
        <div className="sig-speech-pop-up">
          <span className="sig-close-speech-pop-up" onClick={this.props.handleClose}>&times;</span>
          <h3 className="mx-2" style={{display: "inline", width: "150px"}}>{listeningFrame}</h3>
          <button className="btn mx-2" onClick={this.props.handleClose}><i style={{color: "#0096ff"}} className="fas fa-microphone-alt fa-4x"></i></button>
        </div>
      </div>
    );
  }
}