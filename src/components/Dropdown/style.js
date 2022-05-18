import styled from "styled-components";
import { Theme } from "App/theme";
const FormWrapper = styled.div`
  border: none;
  border-width: 1px 1px 1px 0;
  background: #fff;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  min-width: 80px;
  border-radius: 5px;
  height: 35px;
  line-height: 35px;
  padding: 0 10px;
  ::after {
    display: none;
  }
  &.setborder {
    border: 1px solid rgba(198, 198, 198, 0.5);
  }
  .ant-dropdown {
    max-height: 30vh;
    overflow-y: scroll;
    position: absolute;
    will-change: transform;
    padding: 10px 15px;
    border: 0;
    background: #fff;
    color: #979797;
    border-radius: 5px;
    border: 1px solid #efefef;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    min-width: 104px;
    ::-webkit-scrollbar {
      width: 6px;
      margin: 10px 2px;
      border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      margin: 5px 2px;
      background-color: ${Theme.mainColor};
    }
    & .ant-dropdown-menu {
      background-color: transparent;
      box-shadow: none;
      & .ant-dropdown-menu-item {
        -webkit-border-radius: 5px;
        padding: 0;
        .inside {
          height: 35px;
          line-height: 35px;
          font-size: 12px;
          font-weight: 600;
          font-family: "Rubik", sans-serif;
          background-color: transparent;
          color: ${Theme.mainColor};
          padding: 0 10px;
          -webkit-border-radius: 5px;
          text-align: center;
          width: 100%;
          clear: both;
          white-space: nowrap;
          border: 0;
          margin: 0;
        }
        .inside:hover {
          color: #fff;
        }
      }
      & .ant-dropdown-menu-item:hover {
        background: ${Theme.mainColor};
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        .inside {
          color: #fff;
        }
      }
    }
  }
  .inside {
    line-height: 35px;
    font-weight: 600;
    font-size: 12px;
    text-decoration: none !important;
    text-align: center;
    color: ${Theme.mainColor};
    .insideimg {
      margin-right: 5px;
    }
  }
  .inside:hover {
    color: "#000000";
    cursor: pointer;
  }
  &.light-input-wrapper {
    border: none;
    border-radius: 0 30px 30px 0;
    border-width: 1px 1px 1px 0;
    background: #fff;
    &.setborder {
      border: 1px solid rgba(198, 198, 198, 0.5);
    }
    #form-dropdown {
      .inside {
        color: #49465d;
      }
      .ant-dropdown {
        background: #fff;
        color: #49465d;
      }
    }
  }
`;
export { FormWrapper };
