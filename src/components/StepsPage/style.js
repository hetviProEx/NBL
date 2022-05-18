import styled from "styled-components";
import { Theme } from "App/theme";
import { size } from "App/device";

const StepsStyle = styled.div`
  margin-top: 1em;
  margin-bottom: 2em;
  padding: 0 3%;
  .ant-steps {
    .ant-steps-item {
      @media ${size["tablet-md-max"]} {
        display: none;
      }
      .ant-steps-item-container {
        cursor: pointer;
        :hover {
          .ant-steps-item-icon {
            border-color: ${Theme.mainColor} !important;
            .ant-steps-icon {
              color: ${Theme.mainColor} !important;
            }
          }
          .ant-steps-item-content .ant-steps-item-title {
            color: ${Theme.mainColor} !important;
          }
        }
      }
    }
    .ant-steps-item-process {
      @media ${size["tablet-md-max"]} {
        display: block;
        text-align: center;
        padding-left: 0;
        width: 100%;
        .ant-steps-item-container
          .ant-steps-item-content
          .ant-steps-item-title:after {
          display: none;
        }
      }
      .ant-steps-item-container {
        .ant-steps-item-icon {
          background: ${Theme.mainColor};
          border-color: ${Theme.mainColor};
        }
        :hover {
          .ant-steps-item-icon .ant-steps-icon {
            color: #fff !important;
          }
        }
      }
    }
    .ant-steps-item-finish .ant-steps-item-container {
      .ant-steps-item-icon {
        border-color: ${Theme.mainColor};
        .ant-steps-icon {
          color: ${Theme.mainColor};
        }
      }
      .ant-steps-item-content .ant-steps-item-title {
        color: ${Theme.mainColor};
        :after {
          background-color: ${Theme.mainColor};
        }
      }
    }
  }
`;
export { StepsStyle };
