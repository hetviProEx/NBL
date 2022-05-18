import styled from "styled-components";
import { Theme } from "App/theme";
import { size } from "App/device";

const MediaModalStyle = styled.div`
  .ant-modal-content {
    border-radius: 10px;
    @media ${size["tablet-sm-max"]} {
      margin: 5%;
    }
    .ant-modal-header {
      border-radius: 10px;
    }
    .ant-modal-body {
      padding: 1rem;
      .formDiv {
        .field {
          margin: 1em;
          .ant-upload {
            font-size: 1.5em;
            display: block;
            color: ${Theme.mainColor};
            max-width: 10em;
            cursor: pointer;
          }
          .empty {
            .ant-upload {
              color: #e81c1c;
            }
          }
        }
      }
    }
  }
`;
export { MediaModalStyle };
