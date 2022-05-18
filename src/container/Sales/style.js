import styled from "styled-components";
import { size } from "App/device";
import { Theme } from "App/theme";

const SelesStyle = styled.div`
  display: flex;
  .allDiv {
    .ant-row {
      margin-left: 0 !important;
      margin-right: 0 !important;
      .ant-col {
        @media ${size["tablet-md-max"]} {
          padding-top: 1.5em;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .box {
          box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
          border-top-left-radius: 15px;
          border-bottom-right-radius: 15px;
          border-bottom: 5px solid #ffff;
          // :hover {border-bottom: 5px solid #16548b;}
          .ant-card-body {
            padding: 0;
            margin: 0.5em 0;
            display: flex;
            .ant-image {
              margin-left: auto;
              @media ${size["laptop-max"]} {
                width: 50px;
              }
              .topImg {
                padding: 5px;
              }
            }
            .content {
              margin: auto 0;
              .name {
                color: ${Theme.mainColor};
                margin-left: 10px;
              }
              .number {
                font-weight: 600;
                margin-left: 10px;
              }
            }
          }
        }
      }
    }
    .coverDiv {
      margin-top: 4em;
      .contentDiv {
        .tableDiv {
          padding: 1em;
          overflow-x: auto;
        }
        .srchDiv {
          margin: 1em;
          margin-left: auto;
          max-width: 20em;
        }
      }
    }
  }
`;
export { SelesStyle };
