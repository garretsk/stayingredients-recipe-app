import React, { Component } from "react";
import Switch from "react-switch";

export default class ToggleSwitch extends Component {
  constructor(props) {
    super();
    this.state = { 
      checked: props.checked,
      title: props.title,
      callback: props.callback
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
    this.state.callback(checked);
  }

  render() {
    return (
      <label>
        <span>{this.state.title}</span>
        <Switch onChange={this.handleChange} checked={this.state.checked} />
      </label>
    );
  }
}