import { size } from "App/device";
import styled from "styled-components";

const ErrorStyle = styled.div`
  .mainDiv {
    text-align: left;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    display: flex;
    margin: 2em;
    @media ${size["laptop-max"]} {
      display: block;
    }
    .imgDiv {
      margin-right: 5em;
      @media ${size["laptop-max"]} {
        margin-right: 0;
      }
      img {
        margin-top: 5em;
        display: block;
        vertical-align: middle;
        height: 60vh;
        @media ${size["laptop-max"]} {
          display: none;
        }
      }
    }
    .txtDiv {
      .font {
        font-weight: 500;
        color: #fff;
        font-size: 2em;
        line-height: 1;
        margin: 1em 0;
      }
      .small {
        font-size: 1em;
      }
      .big {
        font-size: 4em;
      }
    }
  }
`;

export default ErrorStyle;
