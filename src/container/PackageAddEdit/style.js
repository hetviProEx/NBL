import styled from "styled-components";
import { size } from "App/device";

const PackStyle = styled.div`
  display: flex;
  .allDiv {
    .formDiv {
      margin-top: 1em;
      padding: 1em;
      background-color: #ffff;
      border-radius: 1em;
      box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
      .field {
        padding: 1em;
        .switchDiv {
          .text:first-child {
            margin-left: 0;
          }
        }
        .rdw-editor-wrapper {
          border: 2px solid #dadada;
          .rdw-editor-main {
            height: 10em;
            padding: 0 1em;
          }
        }
      }
      .btnDiv {
        padding: 1em;
        .nextDiv {
          @media ${size["mobile-md-max"]} {
            display: block;
            button + button {
              margin-top: 1em;
              margin-left: auto;
            }
          }
        }
      }
    }
  }
`;
export { PackStyle };
