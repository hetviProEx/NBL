import styled from "styled-components";
import { Theme } from "App/theme";

const SalesAddEditStyle = styled.div`
  display: flex;
  .allDiv {
    .ant-card-bordered {
      border-radius: 1em;
      .ant-card-head {
        border-radius: 1em 1em 0 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.125);
        display: flex;
        padding: 0 15px;
        border-bottom: 5px solid #f1f5f8;
        .ant-card-head-title {
          font-family: "Roboto", sans-serif;
          padding: 5px 0;
          font-size: 1.3em;
          color: ${Theme.mainColor};
        }
      }
    }
    .ant-card-body {
      padding: 0 15px 15px;
      .ant-col {
        min-height: 7em;
        .field {
          margin-top: 2em;
          .switchDiv {
            .text:first-child {
              margin-left: 0;
            }
          }
          .ant-upload {
            font-size: 1.4em;
            display: block;
            color: ${Theme.mainColor};
            max-width: 10em;
            cursor: pointer;
          }
          .empty {
            .ant-upload {
              color: #e81c1c;
            }
          }
        }
      }
    }
    .package_div {
      margin-top: 3em;
    }
    .paymentDiv {
      display: flex;
      margin-top: 2em;
      .payConDiv {
        margin-left: auto;
        padding: 0.5em 0.5em;
        align-items: center;
        display: flex;
        background-color: #ecf2f7;
        color: ${Theme.mainColor};
        h2,
        h3 {
          font-weight: bold;
        }
        h2 .fas {
          margin-right: 5px;
        }
        h3 {
          margin-right: 10px;
        }
      }
    }
    .btnDiv button {
      border-radius: 10px;
    }
  }
`;
export { SalesAddEditStyle };
