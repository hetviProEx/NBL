import styled from "styled-components";
import { size } from "App/device";
import { Theme } from "App/theme";
const WalletStyle = styled.div`
  display: flex;
  .allDiv {
    .ant-col {
      margin-bottom: 15px;
      .ant-card-body,
      .cardDiv {
        padding: 0;
        margin: 0.5em 0;
        .name {
          color: ${Theme.mainColor};
          margin: 0 0 0 0;
        }
        .input-div {
          display: flex;
          margin-top: 10px;
          align-items: center;
          .mark {
            font-weight: 700;
            margin-left: auto;
            margin-bottom: 0;
          }
          .inputBox {
            height: 40px;
            border-radius: 8px 0 0 8px;
            input {
              height: 38px;
            }
            @media ${size["mobile-md-max"]} {
              .ant-input-suffix {
                padding: 0 4px;
              }
            }
          }
          .btn-head {
            height: 40px;
            border-radius: 0 8px 8px 0;
            @media ${size["mobile-md-max"]} {
              width: 13em;
            }
          }
        }
      }
    }
    .boxDiv {
      background: #ffff;
      margin-top: 3em;
      padding: 1em;
      box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
      .inputNum-div {
        margin: 25px 0 0 0;
        display: flex;
        @media ${size["tablet-sm-max"]} {
          display: block !important;
        }
        .inputDiv {
          display: flex;
          justify-content: center;
          align-items: center;
          @media ${size["tablet-sm-max"]} {
            justify-content: flex-start;
          }
          span {
            margin-right: 5px;
            font-weight: 600;
          }
          .entries {
            margin-left: 5px;
          }
        }
        .searchDiv {
          margin-left: auto;
          @media ${size["tablet-sm-max"]} {
            margin-left: 0;
            margin-top: 10px;
          }
        }
      }
      .table-div {
        margin-top: 2em;
        overflow-x: auto;
      }
      .bottomDiv {
        display: flex;
        align-items: center;
        margin-top: 1em;
        .last-para {
          font-weight: 600;
          margin-bottom: 0;
          @media ${size["tablet-max"]} {
            display: none;
          }
        }
        .paginDiv {
          margin-left: auto;
        }
      }
    }
  }
`;
export { WalletStyle };
