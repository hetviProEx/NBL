import styled from "styled-components";
import { Theme } from "App/theme";

const ProductStyle = styled.div`
  display: flex;
  .allDiv {
    .headDiv {
      display: flex;
    }
    .products_div .ant-col {
      margin-top: 1em;
      .card {
        position: relative;
        width: 100%;
        height: 315px;
        background: #ffffff;
        margin-bottom: 22px;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        .ant-card-body {
          padding: 24px 0;
          .imgBx {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 10;
            width: 100%;
            height: 220px;
            transition: 0.5s;
            opacity: 0;
            .ant-image {
              position: absolute;
              top: 68%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(359deg);
            }
          }
          .contant_div {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 100px;
            text-align: center;
            transition: 0.5s;
            z-index: 11;
            padding: 0 10px;
            .contName {
              min-height: 5em;
              h2 {
                font-weight: 600;
                font-size: 24px;
                letter-spacing: 1px; //margin-bottom: 5px;
              }
              p {
                font-size: 15px;
                margin-bottom: 0;
              }
            }
            .viewMore,
            .actionDiv {
              opacity: 0;
              transform: translateY(50px);
              transition: 0.3s;
              margin-top: 8px;
            }
            .viewMore {
              display: inline-block;
              padding: 5px 19px;
              background: #ff771d;
              border-radius: 4px;
              color: #fff;
            }
            .actionDiv {
              display: flex;
              justify-content: center;
              .acLogDiv {
                height: 2em;
                width: 2em;
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0;
                margin: 0 5px;
              }
            }
          }
        }
        :before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: ${Theme.mainColor};
          clip-path: circle(110px at 80% 20%);
          transition: 0.5s ease-in-out;
        }
        :hover {
          :before {
            clip-path: circle(197px at 50% -12%);
          }
          .imgBx {
            top: 0;
            opacity: 1;
            transform: translate(0%, -27%) rotate(0deg);
          }
          .contant_div {
            height: 127px;
            .viewMore,
            .actionDiv {
              opacity: 1;
              transform: translateY(0);
              transition-delay: 0.3s;
              .acLogDiv {
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }
`;
export { ProductStyle };
