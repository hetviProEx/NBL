import styled from "styled-components";
import { Theme } from "App/theme";
const PackageStyle = styled.div`
  .cardDiv {
    background: #fff;
    padding: 1em;
    border-radius: 1em;
    position: relative;
    min-height: 33.5em;
    box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
    :hover,
    &.selected {
      box-shadow: 0 0 10px rgb(0, 0, 0, 0.2);
      :after {
        clip-path: circle(250px at 50% 138%);
      }
      button {
        z-index: 11;
        background: #fff;
        color: ${Theme.mainColor};
      }
    }
    :before,
    :after {
      content: "";
      position: absolute;
      background: ${Theme.mainColor};
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    :before {
      display: block;
      z-index: 9;
      border-radius: 1em;
      clip-path: circle(228px at 50% -12%);
    }
    :after {
      clip-path: circle(96px at 153% 64%);
      transition: 0.5s ease-in-out;
    }
    .pakTypeDiv {
      padding: 0.5em 0 1.2em;
      text-align: center;
      color: #fff;
      font-size: 24px;
      font-weight: bold;
      position: relative;
      z-index: 10;
    }
    .priceDiv {
      display: block;
      color: ${Theme.mainColor};
      font-size: 28px;
      font-weight: bold;
      box-shadow: 0 0 10px rgb(0, 0, 0, 0.2);
      position: absolute;
      z-index: 11;
      background: #fff;
      width: 5em;
      height: 5em;
      border-radius: 50%;
      transform: translateX(-50%);
      left: 50%;
      .price {
        position: absolute;
        top: 50%;
        left: 50%;
        text-align: center;
        transform: translate(-50%, -50%);
        width: 100%;
        .fas {
          font-size: 1em;
          margin-right: 5px;
        }
        small {
          font-size: 13px;
          display: block;
        }
      }
    }
    .contentDiv {
      position: relative;
      margin: 11em 1em 1em;
      overflow-x: hidden;
      overflow-y: auto;
      height: 10em;
      display: flex;
      justify-content: center;
      word-break: break-word;
      p {
        overflow: unset;
      }
      ::-webkit-scrollbar {
        background-color: #fff;
        width: 2px;
      }
      ::-webkit-scrollbar-thumb {
        background-color: ${Theme.mainColor};
      }
    }
    button {
      margin: auto;
    }
  }
`;
export { PackageStyle };
