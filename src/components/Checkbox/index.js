import React, { Component } from "react";
import { Checkbox } from "antd";
import { StyleContainer } from "./style";

export default class Check extends Component {
  render() {
    const { text, onChange, checked, disabled } = this.props;
    return (
      <StyleContainer>
        <Checkbox
          onChange={onChange}
          checked={checked}
          disabled={disabled ? disabled : false}
        >
          {text}
        </Checkbox>
      </StyleContainer>
    );
  }
}
