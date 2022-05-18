import styled from "styled-components";
import { Theme } from "App/theme";
const FormWrapper = styled.div`
  .switch {
    width: 50px;
    background: #b2b2b2;
    border-radius: 5px;
    height: 25px;
    .ant-switch-handle::before {
      background-color: #ffff;
      width: 21px;
      height: 21px;
      border-radius: 5px;
    }
  }
  .ant-switch-checked .ant-switch-handle {
    left: 1.9em;
  }
  .ant-switch-checked {
    background: ${Theme.mainColor};
  }
`;

export { FormWrapper };
