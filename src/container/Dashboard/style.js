import styled from "styled-components";
import { size } from "App/device";
import { Theme } from "App/theme";
const DashbordStyle = styled.div`
  display: flex;
  .allDiv {
    h2 {
      margin: 0.6em 0;
    }
    .mainTxt {
      font-weight: 600;
    }
    .date-div {
      margin-bottom: 1em;
      font-size: 16px;
      display: flex;
      justify-content: flex-end;
    }
    .top-row {
      margin-top: 1em;
      .ant-col {
        padding: 12px;
      }
      .box {
        box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
        border-top-left-radius: 15px;
        border-bottom-right-radius: 15px;
        margin-right: 1em;
        margin-bottom: 15px;
        border-bottom: 5px solid #ffff;
        // :hover {border-bottom: 5px solid #16548b;}
        .ant-card-body {
          padding: 0;
          margin: 0.5em 0;
          display: flex;
          height: auto;
          .content {
            margin: auto 0;
            .name {
              color: ${Theme.mainColor};
              margin-left: 10px;
            }
          }
          .ant-image {
            margin-left: auto;
            @media ${size["laptop-max"]} {
              width: 50px;
            }
            .topImg {
              padding: 5px;
            }
          }
        }
      }
      .dateUI {
        display: flex;
        align-items: center;
      }
    }
    .graphsRow .ant-col {
      .garphDiv {
        box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
        margin-top: 1em;
        height: 25em;
        background-color: #fff;
        border-radius: 1em;
        padding: 1em;
      }

      .titleDiv {
        height: 2em;
        display: flex;
        align-items: center;
        h2 {
          margin: 0 0;
        }
      }

      .slider_div2 {
        margin-top: 1em;
        box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
        background-image: linear-gradient(to right, #5ca2e0, #3b6386);
        height: 25em;
        border-radius: 1em;
        .accountDiv {
          display: table !important;
          .contentDiv {
            display: table-cell;
            vertical-align: middle;
            height: 25em;

            h1,
            h3 {
              color: #fff;
            }
            .mainTxt {
              // margin-left: 0;
              text-align: center;
            }
            .detailDiv {
              text-align: center;
              color: white;
              margin-top: 1.5em;
              .formtxt {
                margin-top: 1em;
              }
            }
          }
        }
        .ant-image-img {
          border-radius: 1em;
        }
      }
    }
    .repodiv {
      margin-top: 2em;
      .garphDiv2 {
        box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
        background-color: #fff;
        padding: 1em;
        height: 18em;
        border-radius: 1em;
      }
      .referral_div2 {
        box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
        padding: 2em;
        height: 18em;
        background-color: #fff;
        border-radius: 1em;
        .title {
          width: 13rem;
          line-height: 2.15rem;
          color: #3b6386;
          font-size: 1.25rem;
          .fontFree {
            font-weight: 500;
          }
        }
        .idr_txt {
          width: 15rem;
          line-height: 1.625;
          margin-top: 0.5 rem;
          color: grey;
        }
        .numberBox2 {
          color: #16548b;
          width: 12em;
          border-style: dashed;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: inherit;
          border-radius: 5px;
          margin-top: 1em;
          background: #d9d9ea;
          .referral-code {
            margin: 0;
            text-align: center;
            font-size: 24px;
            color: #16518b;
            font-weight: 700;
          }
        }
      }
    }
    .hotdiv {
      margin-top: 2em;
      .slick-list{
        border-radius: 1em;
        .hotRow {
          display: flex;
          justify-content: space-around;
          margin-right: 5px;
          .Feature-card2 {
            background-color: white;
            text-align: center;
            .ant-image-img{
              box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
              width: 8em;
              height: 8em;
              border-radius: 50%;
            }
            h3,.descDiv{
              margin-top: 0.5em;
            }
            .descDiv{
              word-break: break-word;
              max-height:3em;
              overflow: auto;
            }
          }
          .zoom-in:hover {
            transform: scale3d(1.03, 1.05, 1.05);
          }
        }
      }
      .slick-dots {
        bottom: 0;
        li{
          button{
            background: #575858;
          }
        }
      }
    }
    .features {
      text-align: center;
      border-radius: 5px;
      .ant-card-body {
        padding: 10px;
      }
    }
  }
`;
export { DashbordStyle };
