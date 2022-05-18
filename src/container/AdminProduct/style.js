import styled from "styled-components";
import { Theme } from "App/theme";

const AdminProStyle = styled.div`
  display: flex;
  .allDiv {
    h2 {
      font-size: 1.3em;
    }
    .formDiv {
      padding: 1em;
      margin-top: 1em;
      border-radius: 1em;
      background-color: #ffff;
      box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
      .field {
        margin-top: 1em;
      }
      .compLogoDiv {
        margin-top: 1em;
        text-align: center;
        .ant-upload {
          font-size: 1.5em;
          display: block;
          color: ${Theme.mainColor};
          max-width: 10em;
          cursor: pointer;
          margin: auto;
        }
        .optionui {
          margin-right: 10px;
        }
      }
      .addbtn {
        padding-top: 2em;
        display: flex;
        align-items: center;
        justify-content: center;
        .addButton {
          margin-right: 0;
          margin-left: 0;
        }
      }
      .imagesDiv .imgDiv {
        display: inline-block;
        padding: 0 2em;
        margin-top: 2em;
        text-align: center;
        .anticon {
          margin-left: 10px;
          cursor: pointer;
        }
      }
      .pdfSDiv {
        display: inline-block;
        margin-right: 2em;
        margin-top: 2em;
        a {
          color: ${Theme.mainColor};
          .anticon-file-pdf {
            svg {
              width: 2em;
              height: 2em;
            }
          }
        }
        .anticon-delete {
          margin-left: 10px;
        }
      }
      .linkDiv {
        display: inline-block;
        margin-right: 2em;
        margin-top: 1em;
        padding: 1em 0;
        .videoBox {
          display: flex;
          .anticon-close {
            margin-left: 10px;
          }
        }
      }
    }
    .mainStep {
      padding: 0 20%;
    }
  }
`;
export { AdminProStyle };
