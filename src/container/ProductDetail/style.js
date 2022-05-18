import styled from "styled-components";
import { Theme } from "App/theme";
import { size } from "App/device";
const ProDetailstyle = styled.div`
  display: flex;
  .allDiv {
    padding: 1em;
    .headDiv {
      display: flex;
      margin-bottom: 2em;
      h2 {
        margin-bottom: 0;
      }
    }
    .boxDiv {
      border-radius: 20px;
      margin-top: 2%;
      padding: 1%;
      background-color: #fff;
      box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
      .imgDiv {
        text-align: center;
        .ant-image {
          border-radius: 1em;
          .proImg {
            margin: 3rem;
            width: 10rem;
            @media ${size["tablet-sm-max"]} {
              width: 7rem;
              margin-bottom: 1rem;
            }
          }
        }
      }
      .infoHead {
        color: ${Theme.mainColor};
        text-decoration: underline;
        font-size: 24px;
        letter-spacing: 1px;
        margin-bottom: 10px;
        padding-left: 2rem;
      }
      .infoPra {
        letter-spacing: 1px;
        padding-left: 2rem;
        word-break: break-word;
      }
    }
    .ant-empty {
      display: none;
    }
    .box5 .boxDiv {
      .txtHead {
        margin-top: 6px;
        margin-left: 10px;
        color: ${Theme.mainColor};
      }
      .pdfS {
        width: 10em;
        text-align: center;
        display: inline-block;
        margin: 10px;
      }
      .swichDiv {
        text-align: center;
        margin-top: 10px;
      }
    }
    .box6 .boxDiv .txtHead {
      color: ${Theme.mainColor};
    }
    .Card-Div .ant-col {
      margin-top: 3em;
    }
  }
`;
export { ProDetailstyle };
