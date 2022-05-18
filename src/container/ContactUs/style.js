import styled from "styled-components";
import { size } from "App/device";
const ContactStyle = styled.div`
  display: flex;
  .allDiv {
    .ant-col {
      padding-top: 1em;
      .ant-card-body {
        padding: 1.5em;
        min-height: 21em;
        .cardHead {
          display: flex;
          padding-top: 1em;
          color: #a0a0a0;
          .iconDiv {
            width: 2em;
            .icon {
              color: #16548b;
            }
          }
          + .cardHead {
            padding-top: 0em;
          }
        }
        ul {
          list-style-type: none;
          padding: 0;
        }
        .banch_div {
          display: flex;
          .search_div {
            margin-left: auto;
          }
          @media ${size["tablet-max"]} {
            display: block;
          }
        }
        .address_col {
          padding-top: 3em;
          ul {
            color: #a0a0a0;
          }
        }
      }
    }
  }
`;

export { ContactStyle };
