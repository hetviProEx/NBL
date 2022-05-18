import React, { Component } from "react";
import { Switch } from "antd";
import { FormWrapper } from "./style";

class Swticher extends Component {
  render() {
    const { left, right, handleChange, checked } = this.props;
    return (
      <FormWrapper>
        <Switch
          className={"switch"}
          onChange={handleChange}
          checked={checked}
          checkedChildren={right}
          unCheckedChildren={left}
        />
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
