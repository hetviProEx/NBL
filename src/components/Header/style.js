import styled from "styled-components";
import { size } from "App/device";
import { Theme } from "App/theme";

const StyleComponent = styled.div`
  z-index: 99;
  width: 100%;
  background-color: #f1f5f8;
  color: ${Theme.mainColor};
  border-radius: 1em;
  font-family: "Roboto", sans-serif;
  .maindiv {
    height: 4em;
    border-bottom: 1px solid #dee7ef;
    .head-container {
      display: flex;
      color: #fff;
      width: 100%;
      font-size: 24px;
      justify-content: space-between;
      padding: 0.7rem;
      .all {
        margin-top: 5px;
        @media ${size["mobile-md-max"]} {
          display: none;
        }
        .ant-breadcrumb {
          > span {
            display: flex;
          }
          .ant-breadcrumb-separator {
            color: ${Theme.mainColor};
            font-weight: bolder;
            margin: 6px 2px;
          }
        }
      }
      div {
        display: flex;
        i {
          color: ${Theme.mainColor};
          padding: 0.3125rem;
          margin-right: 0.7rem;
          font-size: 1.25rem;
          line-height: inherit;
          padding-bottom: 0;
          :before {
            cursor: pointer;
          }
        }
        &.dropDiv .title {
          line-height: 1.3em;
          margin-left: 10px;
          font-weight: 600;
          color: #18558a;
        }
      }
      h3 {
        margin: 2px;
        font-size: large;
      }
      h5.txt {
        margin-top: 5px;
        @media ${size["tablet-md-max"]} {
          max-width: 7.5em;
        }
        @media ${size["mobile-md-max"]} {
          max-width: 7em;
        }
      }
      div:last-child {
        margin-left: auto;
      }
    }
    label.stlbl {
      margin: 0.5em;
      color: #fff;
      @media ${size["tablet-max"]} {
        display: none;
      }
    }
    a .ant-image {
      display: none;
    }
  }
  .menubtn {
    display: none;
    @media ${size["tablet-max"]} {
      display: block;
      padding: 5px 10px;
      color: #fff;
      font-size: 2em;
      .anticon {
        vertical-align: 0;
      }
    }
  }
`;

export { StyleComponent };
