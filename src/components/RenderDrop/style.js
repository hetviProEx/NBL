import styled from "styled-components";
import { Theme } from "App/theme";

const StyleComponent = styled.div`
  .ant-dropdown {
    max-width: 300px;
    .ant-dropdown-menu {
      padding: 4px 5px;
      border-radius: 10px;
      .ant-dropdown-menu-item,
      .ant-dropdown-menu-submenu-title {
        white-space: unset;
        padding: 5px 12px;
        border-radius: 5px;
      }
      .actionBtn {
        display: flex;
        align-items: center;
        padding: 4px;
        .fas {
          color: ${Theme.baseColor};
          margin-right: 0.2rem;
          font-size: 15px;
        }
        .text {
          color: ${Theme.baseColor};
          font-size: 15px;
          font-weight: 500;
        }
        :hover {
          border-bottom: 1px solid ${Theme.baseColor};
        }
      }
    }
  }
`;
export { StyleComponent };
