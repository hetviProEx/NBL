import styled from "styled-components";
import { size } from "App/device";
const WalletStyle = styled.div`
  display: flex;
  .allDiv {
    .top-row {
      margin-top: 1em;
      .ant-col {
        padding: 12px;
      }
      .box {
        box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
        border-top-left-radius: 15px;
        border-bottom-right-radius: 15px;
        margin-right: 1em;
        margin-bottom: 15px;
        border-bottom: 5px solid #ffff;
        .mainTxt {
          font-weight: 600;
        }
      }
    }
    .coverDiv .contentDiv {
      .wdHead {
        display: flex;
        margin-top: 1em;
        align-items: center;
        padding: 1em;
        .searchdiv {
          margin-left: auto;
        }
        .addDiv {
          display: flex;
          align-items: center;
          .inputBox {
            border-radius: 8px 0 0 8px;
          }
          .btn-head {
            border-radius: 0 8px 8px 0;
          }
        }
        @media ${size["tablet-md-max"]} {
          display: block;
          .addDiv {
            width: 16em;
          }
          .searchdiv {
            width: 16em;
            margin-left: 0;
            margin-top: 1em;
          }
        }
        @media ${size["tablet-max"]} {
          display: flex;
          .addDiv {
            width: 16em;
          }
          .searchdiv {
            width: 16em;
            margin-left: auto;
            margin-top: 0;
          }
        }
        @media ${size["tablet-sm-max"]} {
          display: block;
          .addDiv {
            width: 16em;
          }
          .searchdiv {
            width: 16em;
            margin-left: 0;
            margin-top: 1em;
          }
        }
      }
      .tableDiv {
        padding: 1em;
        overflow-x: auto;
      }
    }
  }
  .ant-modal-content {
    border-radius: 1em;
    .ant-modal-body {
      min-height: 10em;
      align-items: center;
      display: flex;
    }
  }
`;
export { WalletStyle };
