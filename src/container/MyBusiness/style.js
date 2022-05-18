import styled from "styled-components";
import { Theme } from "App/theme";
import { size } from "App/device";

const BusinessStyle = styled.div`
  display: flex;
  .allDiv {
    padding: 1em 1em 1em;
    .ant-col {
      margin-bottom: 1em;
      .headDiv {
        display: flex;
        height: 5em;
        align-items: center;
        @media ${size["tablet-sm-max"]} {
          height: 0;
          margin: 1rem 0 2rem 0;
        }
        h2 {
          color: ${Theme.mainColor};
        }
      }
      .fileManaDiv {
        background-color: #fff;
        border-radius: 1em;
        padding: 1em;
        box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
        .textDiv {
          display: flex;
          align-items: center;
          height: 2.5em;
          margin-bottom: 1em;
          color: ${Theme.mainColor};
          font-size: 1.5rem;
          font-weight: 700;
          padding: 0 1em;
          border-radius: 0.5em;
          :hover {
            background-color: ${Theme.mainColor};
            color: #fff;
          }
        }
        .selecText {
          background-color: ${Theme.mainColor};
          color: #fff;
        }
      }
    }
  }
`;
export { BusinessStyle };
