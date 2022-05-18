import styled from "styled-components";
import { size } from "App/device";
import { Theme } from "App/theme";

const FormWrapper = styled.div`
  padding: 0;
  margin: 0;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
  .ant-input-affix-wrapper {
    padding: 0;
    box-shadow: none;
    border-radius: 8px;
    input {
      box-shadow: none;
    }
  }
  .ant-input-prefix {
    margin-right: 5px;
  }
  .ant-input-suffix {
    padding: 0 8px;
    color: ${Theme.mainColor};
  }
  input {
    display: block;
    width: 100%;
    line-height: 1.5;
    margin: 0;
    -webkit-appearance: none;
    background: #fff;
    border: 0;
    height: 2.5rem;
    font-size: 15px;
    font-weight: 400;
    padding: 0 10px;
    border-radius: 8px;
    ::placeholder {
      color: #b5b5b5;
    }
    :-ms-input-placeholder {
      color: #b5b5b5;
    }
    ::-ms-input-placeholder {
      color: #b5b5b5;
    }
    :hover,
    :focus {
      outline: none;
    }
    @media ${size["desktop-sm-max"]} {
      font-size: 14px;
      padding: 5px 10px;
    }
  }
  .ant-input,
  .ant-input-password {
    border: 1px solid rgba(0, 0, 0, 0.125);
    color: #000;
    border-radius: 8px;
  }
  .ant-input-password {
    input {
      box-shadow: none !important;
      border-radius: 8px 0 0 8px !important;
    }
    .ant-input-suffix {
      border-radius: 0 8px 8px 0;
    }
  }
  .empty {
    border: 1px solid #e81c1c;
    box-shadow: 0 0 10px red !important;
  }
  .empty-field {
    border: 1px solid #e81c1c;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  .ant-input-affix-wrapper > input.ant-input {
    padding: 0 10px;
  }
`;

export { FormWrapper };
