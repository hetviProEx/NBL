import styled from "styled-components";
import { Theme } from "App/theme";
import { size } from "App/device";

const ExtensionStyle = styled.div`
  display: flex;
  .allDiv .coMainDiv {
    margin-top: 1em;
  }
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
    .ant-select{width: 100%}
    .ant-select-selector {
      min-height: 3em;
      border-radius: 8px;
    }
    .empty {
      .ant-select-selector {
        border: 1px solid #e81c1c;
        box-shadow: 0 0 7px red !important;
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
