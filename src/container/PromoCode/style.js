import styled from "styled-components";
import { size } from "App/device";

const PromoStyle = styled.div`
  display: flex;
  .allDiv .proMainDiv {
    margin-top: 1em;
    .ant-drawer .ant-drawer-content-wrapper {
      width: 500px !important;
      @media ${size["tablet-sm-max"]} {
        width: 320px !important;
      }
      .ant-drawer-header {
        padding: 0 1em;
        .ant-drawer-title .headDiv {
          height: 4em;
          display: flex;
          align-items: center;
        }
      }
    }
  }
`;
export { PromoStyle };
