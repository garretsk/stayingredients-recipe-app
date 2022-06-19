import React, { Component } from "react";
import capitalizeString from "../utils/capitalizeString";
import Expand from "react-expand-animated";

const TIMEOUT = 1000;

export default class Ingredient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expand: false
    };

    this.expand = this.expand.bind(this);
  }

  expand() {
    this.setState({expand: true});
  }

  componentDidMount() {
    this.expand();
  }

  render() {
    return(
      <Expand open={this.state.expand}>
        <span>
          <button onClick={() => this.props.handleSelect(this.props.id)}
            className={`my-3 ${
              this.props.isSelected ? "sig-selected" : "sig-unselected"
            }`}
          >
            <img alt="ingredient" height="80" width="80" src={this.props.image}/>
            <br/>
            <h5 style={{marginTop: "10px"}}>{capitalizeString(this.props.name)}</h5>
          </button>
        </span>
      </Expand>
    );
  }
}