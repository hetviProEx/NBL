import styled from "styled-components";
import { arrowdown } from "components/Images";

import { Theme } from "App/theme";

const SelectContainer = styled.div`
  height: 3em;
  width: 100%;
  .ant-select {
    height: 3em;
    width: inherit;
    .ant-select-selection-search,
    .ant-select-selection-item,
    .ant-select-selection-search-input {
      height: 3em !important;
      line-height: 38px;
    }
    .ant-select-selector {
      width: -webkit-fill-available;
      border: 1px solid rgba(0, 0, 0, 0.125);
      height: 3em;
      border-radius: 8px;
      color: #000;
      input {
        box-shadow: none !important;
      }
      :before {
        border: 0;
        background-size: 100% auto;
        width: 15px;
        height: 15px;
        position: absolute;
        content: "";
        top: 35%;
        z-index: 1;
      }
      :after {
        background: url(${arrowdown}) no-repeat center;
        visibility: visible;
        border: 0;
        background-size: 100% auto;
        width: 9px;
        height: 8px;
        position: absolute;
        content: "";
        right: 1em;
        top: 40%;
        z-index: 1;
      }
    }
    &.ant-select-open .ant-select-selector {
      :after {
        transform: rotate(180deg);
      }
    }
  }
  .ant-select-item-option-content {
    color: ${Theme.mainColor};
    font-weight: 700;
  }
  .empty {
    .ant-select-selector {
      border: 1px solid #e81c1c;
      box-shadow: 0 0 7px red !important;
    }
  }
  &.default {
    .ant-select .ant-select-selector {
      height: 30px;
      background: ${Theme.baseColor};
      border-radius: 5px;
      color: #c1c1c1;
    }
  }
  .ant-select-disabled.ant-select:not(.ant-select-customize-input)
    .ant-select-selector
    input {
    cursor: default;
  }
`;
export { SelectContainer };
