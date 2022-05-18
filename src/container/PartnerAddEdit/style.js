import styled from "styled-components";
import { Theme } from "App/theme";
import { size } from "App/device";

const AdmProductStyle = styled.div`
  display: flex;
  .detailDiv {
    padding: 1em;
    margin-top: 1em;
    border-radius: 1em;
    background-color: #ffff;
    box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
    .formDiv {
      .field {
        .text:first-child {
          margin-left: 0;
        }
        .ant-upload {
          font-size: 1.5em;
          padding-left: 1em;
          display: block;
          color: ${Theme.mainColor};
        }
      }
      .bottomDiv {
        display: flex;
        margin-top: 2em;
        .btn {
          margin-left: auto;
          button:first-child {
            margin-right: 2em;
          }
        }
      }
    }
    .formFinDiv .bottomFinDiv {
      display: flex;
      margin-top: 2em;
      .btnFin {
        margin-left: auto;
        button:first-child {
          margin-right: 2em;
        }
      }
    }
    .formConDiv {
      margin-top: 1em;
      border-radius: 1em;
      box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
      padding-bottom: 0.5em;
      .field {
        margin: 1em;
      }
      .bottomConDiv {
        margin: 1em;
        display: flex;
        @media ${size["tablet-md-max"]} {
          display: block;
        }
        .rightBtnDiv {
          margin-left: auto;
        }
        .leftBtnDiv,
        .rightBtnDiv {
          button {
            margin-right: 1em;
            margin-top: 1em;
          }
        }
      }
    }
  }
`;
export { AdmProductStyle };
