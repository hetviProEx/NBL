import React, { Component } from "react";
import { Button } from "./style";
import { Theme } from "App/theme";

const ButtonConst = {
  primary: { background: Theme.mainColor, color: "#fff" },
  secondary: { background: "#edf2f7", color: Theme.mainColor },
  answer: { background: "green", color: "#fff" },
  decline: { background: "red", color: "#fff" },
};
class FormButton extends Component {
  render() {
    const { children, type, color, onClick, className, ...props } = this.props;
    return (
      <Button
        bgcolor={ButtonConst[color]}
        type={type}
        onClick={onClick}
        className={className}
        {...props}
      >
        {children}
      </Button>
    );
  }
}
FormButton.defaultProps = {
  text: "Button",
  color: "primary",
  type: "button",
  className: "",
  handleClick: () => {},
};
export default FormButton;
