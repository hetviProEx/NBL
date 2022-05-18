import React, { Component } from "react";
import { FormWrapper } from "./style";

class Label extends Component {
  render() {
    const { title, onClick, className } = this.props;
    return (
      <FormWrapper onClick={onClick}>
        <label className={"form-label " + className}>{title}</label>
      </FormWrapper>
    );
  }
}
Label.defaultProps = {
  title: "Label",
  className: "",
};
export default Label;
