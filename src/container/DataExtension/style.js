import styled from "styled-components";
import { size } from "App/device";
import { Theme } from "App/theme";
const ExtensionStyle = styled.div`
  display: flex;
  .allDiv {
    .covDiv .contDIV .contHead {
      .filterDiv {
        display: flex;
        margin-left: auto;
        .filter:first-child {
          width: 20em;
          margin-right: 1em;
        }
      }
      @media ${size["tablet-md-max"]} {
        display: block !important;
        .filterDiv {
          display: block !important;
          .filter {
            max-width: 20em;
            :first-child {
              margin-right: 0;
              margin-bottom: 1em;
            }
          }
        }
      }
    }
  }
  .ma {
    margin-left: auto;
  }
  .hlpDiv {
    padding: 10px;
    padding-bottom: 20px;
    .link {
      background-color: #0061a6;
      padding: 10px;
      border-radius: 5px;
      margin-right: 10px;
    }
  }
  .txt:hover {
    color: ${Theme.mainColor};
  }
  .ant-table-wrapper .ant-table-container .ant-table-content {
    .ant-table-row {
      .callUi,
      .contactUI {
        a,
        .webUI {
          cursor: pointer;
          color: #636363;
          :hover {
            color: ${Theme.mainColor};
          }
        }
      }
    }
  }
`;
export { ExtensionStyle };
