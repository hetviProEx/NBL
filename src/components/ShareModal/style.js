import styled from "styled-components";
import { Theme } from "App/theme";
import { size } from "App/device";
const ShareModalStyle = styled.div`
  .ant-modal-content {
    border-radius: 10px;
    @media ${size["tablet-sm-max"]} {
      margin: 5%;
    }
    .ant-modal-header {
      border-radius: 10px;
    }
    .ant-modal-body {
      .socialDiv {
        height: 5em;
        display: flex;
        align-items: center;
        justify-content: center;
        .IconsDiv {
          height: 4em;
          width: 4em;
          @media ${size["mobile-md-max"]} {
            height: 3em;
            width: 3em;
          }
        }
        .IconsDiv + .IconsDiv {
          margin: 0 1em;
          @media ${size["mobile-md-max"]} {
            margin: 0 0.5em;
          }
        }
        .IconsDiv:first-child {
          margin-right: 1em;
          @media ${size["mobile-md-max"]} {
            margin-right: 0 0.5em;
          }
        }
        .IconsDiv:hover {
          opacity: 0.9;
          transform: rotate(360deg) scale(1.2);
          transition: 0.3s;
        }
      }
      .refralDiv {
        border: 3px solid ${Theme.mainColor};
        border-style: dashed;
        margin-top: 1.5em;
        height: 4em;
        background-color: #d6ecff;
        border-radius: 15px;
        display: flex;
        .textDiv {
          display: flex;
          align-items: center;
          margin-left: 1.5em;
          color: ${Theme.mainColor};
        }
        .copyText {
          margin-left: auto;
          margin-right: 1.5em;
        }
      }
    }
  }
`;
export { ShareModalStyle };
