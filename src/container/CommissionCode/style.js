import styled from "styled-components";
import { size } from "App/device";

const CommissionStyle = styled.div`
  display: flex;
  .allDiv .coMainDiv {
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
      .ant-drawer-body {
        .formDiv .field {
          .text{
            font-size: 1.5em;
            :first-child{
              margin-left:0;
            }
          }
          .fileUpl .ant-upload {
            font-size: 1.5em;
          }
        }
      }
    }
  }
`;
export { CommissionStyle };
