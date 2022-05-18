import React, { Component } from "react";
import { Switch } from "antd";
import { FormWrapper } from "./style";

class Swticher extends Component {
  render() {
    const { left, right, handleChange, checked, className } = this.props;
    return (
      <FormWrapper>
        <span className={`text ${checked ? "font-medium" : ""}`} key={"s1"}>
          {left}
        </span>
        <Switch
          className={`switch ${className ? className : ""}`}
          onChange={handleChange}
          checked={checked}
        />
        <span className={`text ${!checked ? "font-medium" : ""}`} key={"s2"}>
          {right}
        </span>
      </FormWrapper>
    );
  }
}
Swticher.defaultProps = {
  status: "left",
  left: "No",
  right: "Yes",
};

export default Swticher;
