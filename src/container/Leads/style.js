import styled from "styled-components";
import { size } from "App/device";
import { Theme } from "App/theme";
const LeadsStyle = styled.div`
  display: flex;
  .allDiv {
    .ant-row {
      .ant-drawer {
        .ant-drawer-content-wrapper {
          width: 500px !important;
          @media ${size["tablet-sm-max"]} {
            width: 100vw !important;
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
            padding: 0 1em;
            .fieldClass {
              .ant-col {
                margin-top: 0;
              }
              .swichDiv {
                text-align: center;
              }
              .ant-switch-checked .ant-switch-inner {
                margin: 0 25px 0 2px;
              }
            }
            .btnDiv {
              display:flex;
              margin-bottom: 1em;
              justify-content: end;
              button{
                margin-left: 0;
                :last-child{
                  margin-left: 1em;
                }
              }
            }
          }
        }
      }
      .ant-col {
        margin-top: 1em;
        .coverDiv .contentDiv {
          .top-row {
            margin-left: 0px !important;
            margin-right: 0px !important;
            margin-bottom: 1.5em;
            .ant-col {
              padding: 12px;
            }
            .cardDiv .report-box {
              :before {
                background: #fff;
                box-shadow:none;
              }
              .box {
                background-color: #f1f5f8;
                border-top-left-radius: 15px;
                border-bottom-right-radius: 15px;
                color: ${Theme.mainColor};
                :hover {
                  background-color: ${Theme.mainColor};                  
                  .mainTxt,
                  .name {
                    color: #fff;
                  }
                }
              }
            }
          }
          .tableDiv {
            padding: 1em;
            overflow-x: auto;
          }
      }
    }
  }
`;
export { LeadsStyle };
