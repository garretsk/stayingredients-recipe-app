import React, { Component } from "react";
import SocialMediaButtons from "./SocialMediaButtons";

export default class SocialMediaSharePopUp extends Component {

  render() {
    return (
      <div className="sig-social-media-share-pop-up-bg">
        <div className="sig-social-media-share-pop-up-outside" onClick={this.props.handleClose}></div>
        <div className="sig-social-media-share-pop-up">
          <span className="sig-close-social-media-share-pop-up" onClick={this.props.handleClose}>&times;</span>
          <div>
            <h3 className="my-1">Share to:</h3>
            <SocialMediaButtons url={this.props.url} quote={this.props.quote} hashtag={this.props.hashtag}></SocialMediaButtons>
          </div>
        </div>
      </div>
    );
  }
}