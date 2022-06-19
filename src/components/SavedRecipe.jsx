import React, { Component } from "react";
import SocialMediaSharePopUp from "./SocialMediaSharePopUp";
import StatusPopUp from "./StatusPopUp";

export default class SavedRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      showSocialMediaShare: false,
      showSaveUnsaveStatus: false
    };

    this.expand = this.expand.bind(this);
    this.handleRecipeClick = this.handleRecipeClick.bind(this);
    this.handleShowSocialMediaShare = this.handleShowSocialMediaShare.bind(this);
    this.handleSocialMediaSharePopUpClose = this.handleSocialMediaSharePopUpClose.bind(this);
    this.handleSaveAndUnsave = this.handleSaveAndUnsave.bind(this);
    this.handleStatusPopUpClose = this.handleStatusPopUpClose.bind(this);
  }

  expand() {
    this.setState({expand: true});
  }

  handleRecipeClick() {
    console.log("handleRecipeClick");
  }

  handleShowSocialMediaShare() {
    this.setState({showSocialMediaShare: true});
  }

  handleSocialMediaSharePopUpClose() {
    this.setState({showSocialMediaShare: false});
  }

  handleSaveAndUnsave() {
    this.props.toggleSaved(this.props.id);

    this.setState({showSaveUnsaveStatus: true});
  }

  handleStatusPopUpClose() {
    this.setState({showSaveUnsaveStatus: false});
  }
  
  componentDidMount() {
    this.expand();
  }

  render() {
    let alertMessage;
    if(this.props.isSaved) {
      alertMessage = "Recipe has been saved";
    }
    else {
      alertMessage = "Recipe has been unsaved";
    }

    let statusPopUp = <StatusPopUp alert={alertMessage} handleClose={this.handleStatusPopUpClose}/>;

    return(
      <span>
        <div className={`border border-secondary mt-5 sig-saved-recipe`}>
          <button className="btn" onClick={this.handleRecipeClick}>
            <img alt="recipe" height="80" width="80" src={this.props.image}/>
            <br/>
            <h5 style={{marginTop: "10px"}}>{(this.props.name)}</h5>
          </button>
          <span style={{display: "block", width: "100%", textAlign: "right"}} className="mt-0">
            <button onClick={this.handleShowSocialMediaShare} style={{display: "inline"}} className="btn mr-2 mt-0">
              <i className="fas fa-share"></i> Share
            </button>
            <button onClick={this.handleSaveAndUnsave} style={{display: "inline"}} className="btn ml-2 mt-0">
              <i className={`${
                this.props.isSaved ? "fas" : "far"
              } fa-bookmark`}></i>
            </button>
          </span>
        </div>
        {this.state.showSocialMediaShare &&
          <SocialMediaSharePopUp handleClose={this.handleSocialMediaSharePopUpClose} url={this.props.image} quote={this.props.name} hashtag="#StayInGredients"/>
        }
        {this.state.showSaveUnsaveStatus &&
          statusPopUp
        }
      </span>
    );
  }
}