import styled from "styled-components";
import { Theme } from "App/theme";
import { size } from "App/device";
const FormWrapper = styled.div`
  .text {
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    color: ${Theme.mainColor};
    display: inline-block;
    vertical-align: middle;
    padding: 5px 0;
    margin: 2px 12px;
    @media ${size["tablet-max"]} {
      font-size: 14px;
      margin: 2px 5px;
    }
    &.font-medium {
      font-weight: 300;
    }
  }
  .switch {
    width: 5em;
    border: 0;
    background: white;
    height: 22px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25) !important;
    border-radius: 30px;
    -webkit-border-radius: 30px;
    &.ant-switch-checked:after {
      background: white;
    }
    .ant-switch-handle::before {
      background-color: ${Theme.mainColor};
      top: 1px;
      bottom: 1px;
      width: 2em;
    }
    :after {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border: 0;
      top: 2px;
      left: 3px;
      background: #16548b;
    }
    &.ant-switch-checked:after {
      left: 50%;
    }
  }
  .ant-switch-checked .ant-switch-handle {
    left: 40px;
  }
`;

export { FormWrapper };
