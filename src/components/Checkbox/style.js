import styled from "styled-components";
import { Theme } from "App/theme";

const StyleContainer = styled.div`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${Theme.mainColor};
    border-color: ${Theme.mainColor};
  }
`;
export { StyleContainer };
