import styled from "styled-components";
import { Theme } from "App/theme";
import { size } from "App/device";
import { kin } from "components/Images";

const StyledComponent = styled.div`
  min-height: 60vh;
  padding: 1.25em 2em 3em;
  padding-right: 0;
  font-family: "Roboto", sans-serif;
  @media ${size["tablet-max"]} {
    display: none;
  }
  .logo {
    padding-left: 2em;
  }
  hr {
    margin-right: 1em;
  }
  .ant-menu.ant-menu-root {
    background-color: transparent;
    margin-top: 0.6em;
    transition: background 0.3s, padding 0.3s,
      width 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
    .ant-menu-item,
    .ant-menu-submenu-title {
      border-radius: 2em 0 0 2em;
      height: 50px;
      color: #fff;
      font-size: 16px;
      .ant-menu-title-content {
        width: 9.5em;
      }
      .ant-image {
        margin-right: 1.5em;
      }
      :active {
        background: #fff;
      }
      &.ant-menu-item-active .ant-menu-title-content,
      &.ant-menu-submenu-active .ant-menu-title-content {
        color: ${Theme.mainColor};
      }
    }
    .ant-menu-sub.ant-menu-inline {
      border-radius: 2em;
      background: #005c9d;
      color: #fff;
      padding: 5px; // padding-right: 0;
    }
    .ant-menu-submenu-arrow {
      color: #fff !important;
    }
    .ant-menu-submenu {
      .ant-menu-item {
        margin-bottom: 0;
        padding-left: 38px !important;
      }
      .ant-menu-item-selected {
        font-weight: 500;
        color: ${Theme.mainColor};
      }
    }
    .active.side-menu,
    .active .ant-menu-submenu-title,
    .ant-menu-item-selected,
    .ant-menu-item-active {
      background-color: #f1f5f8;
      color: ${Theme.mainColor};
      &.ant-menu-item-only-child {
        border-radius: 2em;
      }
      i.ant-menu-submenu-arrow {
        color: ${Theme.mainColor} !important;
      }
    }
    .ant-menu-item-only-child.active {
      font-weight: 600;
    }
    // .active.ant-menu-item-only-child {border-radius: 2em;padding-right: 5px;}
    .active.side-menu,
    .active .ant-menu-submenu-title {
      position: relative;
      overflow: visible;
      :after,
      :before {
        content: "";
        width: 30px;
        opacity: 1;
        height: 30px;
        margin-top: 50px;
        transform: scale(1.04);
        background-size: 100%;
        background-image: url(${kin});
        position: absolute;
        top: 0;
        right: 0;
      }
      :before {
        margin-top: -30px;
        transform: rotate(90deg) scale(1.04);
      }
    }
    .ant-menu-item::after {
      border-right: 0;
    }
    &.ant-menu-inline-collapsed {
      width: 45px;
    }
  }
  .ant-menu-inline,
  .ant-menu-vertical,
  .ant-menu-vertical-left {
    border-right: 0;
  }
`;

export { StyledComponent };
