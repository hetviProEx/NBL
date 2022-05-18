import styled from "styled-components";
import { Theme } from "App/theme";
import { size } from "App/device";

const MediaStyle = styled.div`
  display: flex;
  .allDiv .ant-row .ant-col {
    .headDiv {
      display: flex;
      height: 6em;
      align-items: center;
      .searchDiv {
        width: 20em;
        margin-right: 1em;
      }
      .addButton {
        margin-right: 0em;
      }
    }
    .fileManaDiv {
      background-color: #fff;
      border-radius: 1em;
      padding: 1em;
      padding-bottom: 1px;
      box-shadow: 0px 3px 20px #0000000b;
      .textDiv {
        display: flex;
        align-items: center;
        height: 2.5em;
        margin-bottom: 1em;
        color: ${Theme.mainColor};
        font-size: 15px;
        font-weight: 600;
        padding: 0 1em;
        border-radius: 0.5em;
        &.selecText,
        :hover {
          background-color: ${Theme.mainColor};
          color: #fff;
          font-weight: 500;
        }
      }
    }
    .mainMedia{
      // box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
      // background-color: #fff;
      border-radius: 1em;
      .mediaDiv {
        border-bottom: 5px solid #f1f5f8;
        padding: 1em 1.5em;
        margin-bottom: 1em;
        :last-child {
          border-bottom: none;
        }
        .txtHead{
          text-decoration: underline;
        }
        .imagpageDiv {
          margin-top: 1em;
          .imageCard {
            background-color: #fff;
            margin-bottom: 2em;
            padding: 2em;
            text-align: center;
            position: relative;
            border-radius: 1em;
            box-shadow: 0px 3px 20px #0000000b;
            :hover {
              box-shadow: 0px 10px 10px #0000000b;
            }
            .renderDrop {
              position: absolute;
              right: 0px;
              top: 0px;
              margin-right: 0.5rem;
              margin-top: 0.5rem;
              margin-left: auto;
            }
            .actionUI {
              display: flex;
              justify-content: center;
              color: black;
              z-index: 1000;
              .dash {
                transform: rotate(90deg);
                font-size: 16px;
              }
            }
            .file {
              padding: 2em;
              width: 100%;
              @media (max-width: 848px) {
                font-size: 10px;
              }
              @media ${size["tablet-max"]} {
                font-size: 16px;
              }
            }
            .img {
              padding: 5px 15px;
              height: 7em;
              display: flex;
              justify-content: center;
              align-items: center;
              .ant-image-img {
                width: 100%;
                height: 7em !important;
              }
              .anticon {
                font-size: 6em;
                color: ${Theme.baseColor};
              }
            }
            h3 {
              margin-top: 0.5em;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #000;
            }
            .videoDiv {
              width: 100%;
              height: 9em;
              overflow: hidden;
              .responsive-iframe {
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                width: 100%;
                height: 100%;
                border: none;
              }
            }
          }
        }
      }

    }
  }
  .ant-modal-body {
    .imgDiv {
      display: flex;
      padding: 5px;
      .imgA1 {
        max-width: 100%;
        max-height: 20em;
        z-index: 1;
      }
      .imgB1 {
        max-height: 3em;
        z-index: 3;
        position: absolute;
      }
      .textDiv {
        z-index: 4;
        position: absolute;
      }
    }
    .mainFormDIv {
      display: flex;
      .formDIv {
        display: flex;
        .feild {
          width: 8em;
        }
      }
      .btnsDiv {
        margin-top: 1em;
        .bDiv {
          height: 6em;
          width: 6em;
          margin: auto;
          .btn {
            height: 2em;
            width: 2em;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
          .top {
            margin: auto;
          }
          .left {
            margin-right: auto;
          }
          .right {
            margin-left: auto;
          }
          .bottom {
            margin: auto;
          }
        }
      }
    }
  }
`;
export { MediaStyle };
