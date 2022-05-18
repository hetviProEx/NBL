import { Theme } from "App/theme";
import styled from "styled-components";

const StyleComponent = styled.div`
  display: none;
  padding: 0.5em 1em;
  @media (max-width: 767px) {
    display: block;
  }
  .side-menu__sub-icon img {
    transform: rotate(90deg);
  }
  ui li {
    cursor: pointer;
    div,
    a {
      cursor: pointer;
    }
  }
  .mobile-menu {
    .mobile-menu-bar {
      display: flax;
    }
    .menuDiv {
      margin-left: auto;
      .feather {
        color: #fff;
        font-size: x-large;
        transition: visibility 0s ease-in-out 0s, opacity 0.2s 0s;
      }
    }
  }
  .ant-menu {
    padding: 5px;
    border-right: none;
    background-color: #005c9d;
    color: #fff;
    border-radius: 2em;
    margin-bottom: 0.5rem;
    .ant-menu-sub {
      background-color: #00528d;
    }
    .ant-image {
      margin-right: 1em;
      top: 5px;
    }
    .ant-menu {
      margin-bottom: 0;
      padding: 5px;
      border-radius: 2em;
    }
    .ant-menu-submenu-arrow::before,
    .ant-menu-submenu-arrow::after {
      background-color: #fff;
    }
    .ant-menu-item-active,
    .ant-menu-submenu-selected,
    .ant-menu-submenu-title:active,
    .ant-menu-submenu-title:hover,
    .ant-menu-submenu-active {
      background-color: #005c9d;
      color: #fff;
    }
    :not(.ant-menu-horizontal) .ant-menu-item-selected,
    .ant-menu-item:active,
    .active {
      background-color: #fff;
      color: ${Theme.mainColor};
      border-radius: 2em;
    }
  }
`;

export { StyleComponent };
