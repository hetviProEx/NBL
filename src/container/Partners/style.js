import styled from "styled-components";
import { size } from "App/device";
import { Theme } from "App/theme";

const PartnersStyle = styled.div`
  display: flex;
  .allDiv {
    .covDiv .contDIV .contHead {
      @media ${size["tablet-md-max"]} {
        display: block !important;
        .srchDiv {
          margin-left: 0 !important;
        }
      }
    }
  }
  .ant-modal-content {
    border-radius: 10px;
    @media ${size["tablet-sm-max"]} {
      margin: 5%;
    }
    .ant-modal-close-x {
      color: #fff;
    }
    .ant-modal-header {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background-color: ${Theme.mainColor};
      padding: 5px 24px;
      .ant-tabs-nav {
        margin: 0;
        :before {
          border-bottom: none;
        }
        .ant-tabs-tab {
          .ant-tabs-tab-btn {
            color: #fff;
          }
        }
        .ant-tabs-ink-bar {
          background: #fff;
        }
      }
    }
    .ant-modal-body {
      padding: 5px;
      padding-left: 1em;
      font-size: 15px;
      .tableBody {
        overflow: auto;
        height: 14em;
        .modelFront {
          font-weight: bold;
        }
      }
    }
  }
`;
export { PartnersStyle };
