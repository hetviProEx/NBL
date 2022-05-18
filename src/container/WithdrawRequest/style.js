import styled from "styled-components";
import { size } from "App/device";
const RequestStyle = styled.div`
  display: flex;
  .allDiv {
    .covDiv {
      margin-top: 1em;
    }
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
    .ant-drawer-body {
      .formDiv .field {
        .fileUpl .ant-upload {
          font-size: 1.5em;
        }
        .empty {
          .ant-upload {
            color: #e81c1c;
          }
        }
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
export { RequestStyle };
