import styled from "styled-components";
import { bgc } from "components/Images";
import { Theme } from "App/theme";

const CertifiStyle = styled.div`
  display: flex;
  .allDiv {
    .dwlBtn {
      display: block;
      margin-left: auto;
    }
    .scroll {
      overflow-x: auto;
      margin-top: 1em;
      .main {
        padding: 12px;
        width: 842px; // 814px;
        margin: 0 auto;
        min-height: 540px;
        max-height: 595px;
        border: 11px solid black;
        background: white;
        background-image: url(${bgc});
        background-size: cover;
        .title {
          text-align: right;
          margin-right: 26px;
          h3 {
            color: #eb575a;
            font-weight: 700;
            font-size: 50px;
            margin: 0;
            text-transform: uppercase;
            margin-top: -10px;
            margin-bottom: -22px;
          }
          span {
            color: ${Theme.mainColor};
            font-weight: 700;
            font-size: 32px;
            text-transform: uppercase;
          }
        }
        .img-box img {
          width: 163px;
          height: 51px;
          margin-left: 15px;
          margin-top: 10px;
        }
        .text-p h3 {
          font-size: 36px;
          margin-top: 1em;
          color: #000;
        }
        .perDiv h1 {
          color: #eb575a;
          font-size: 33px;
          font-weight: bold;
          margin-top: 12px;
          margin-bottom: 12px;
          line-height: normal;
        }
        .line {
          content: "";
          width: 57%;
          margin-left: 5px;
          border-bottom: 2px solid black;
        }
        .ant-row {
          display: flex;
          flex-flow: row;
        }
        .cartiDiv {
          float: right;
          margin-right: 25px;
          margin-top: 2em;
          img {
            width: 146.05px;
            height: 145.8px;
          }
        }
        .qrcod img {
          width: 57.62px;
          height: 57.62px;
        }
        .termDiv {
          margin: 8px 0 0 8px;
          .qrcodtxt {
            font-weight: 600;
            font-size: 10px;
            line-height: 12px;
            margin-bottom: 0;
            text-transform: capitalize;
          }
        }
        .authDiv {
          margin-left: 5px;
          margin-top: 10px;
          line-height: 1.2;
          h5 {
            color: #000;
            font-size: 25px;
          }
          span {
            font-size: 18px;
            font-weight: 500;
          }
        }
        .imgDiv {
          text-align: center;
          margin-bottom: 8px;
          img {
            height: 55.12px;
          }
          &.nblImg {
            text-align: right;
          }
        }
        .line-1 {
          content: "";
          border-bottom: 1.8px solid black;
          margin-top: 9px;
          width: 85%;
          align-content: stretch;
          align-items: baseline;
          margin: 0 auto;
        }
        .signDiv {
          margin-left: 18px;
          .span-1 {
            color: #eb575a;
            font-size: 16px;
            font-weight: 500;
            letter-spacing: 0.8px;
            display: block;
          }
          .span-2 {
            font-weight: 500;
            font-size: 12px;
            .span-3 {
              border-left: 1px solid black;
              margin-left: 3px;
              padding-left: 4px;
            }
          }
        }
        .date-sign {
          margin-top: 34px;
          text-align: center;
          .dateDiv {
            margin-bottom: 4px;
            .date {
              font-weight: 500;
              font-size: 16px;
            }
          }
        }
        .startDiv img {
          width: 100%;
          height: 3em;
        }
        .lastbox {
          margin-top: 3em;
        }
      }
    }
  }
`;
export { CertifiStyle };
