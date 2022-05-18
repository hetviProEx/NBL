import styled from "styled-components";
import { size } from "App/device";
const ExtensionStyle = styled.div`
  display: flex;
  .allDiv .covDiv {
    .headDIV {
      .hrob {
        font-weight: 500;
        padding: 5px 10px;
        margin-right: 10px;
        border-radius: 0.5em;
        cursor: pointer;
        text-align: center;
        @media ${size["laptop-max"]} {
          padding: 5px;
        }
      }
      .selected {
        color: #fff;
        background: #0061a6;
      }
    }
    .head {
      display: flex;
      padding: 5px 1em;
      .addButton {
        margin-right: 1em;
      }
    }
    .contDIV {
      .contHead .mediaDiv {
        width: 100%;
        .imagpageDiv {
          .ant-col {
            margin-bottom: 1em;
            .img {
              padding: 1em;
              display: flex;
              width: fit-content;
              background-color: #f1f5f8;
              border-radius: 1em;
              margin: 0 5px 10px;
              .anticon-close-circle {
                padding-left: 1em;
                vertical-align: 6em;
              }
            }
          }
        }
      }
      .tableDIV {
        margin-top: 0 !important;
        .actionUI {
          display: flex;
          .size {
            margin: 0 5px;
          }
        }
      }
    }
  }
  .crmAdd {
    .ant-modal {
      margin-top: 1em;      
      .ant-modal-content {
        border-radius: 1em;
        min-height: 13em;
        .ant-modal-header {
          border-top-right-radius: 1em;
          border-top-left-radius: 1em;
        }
        .ant-modal-body {
          padding: 5px 1em;
          .main-div {
            display: flex;
            padding: 5px 1em;
            border-radius: 1em;
            cursor: pointer;
            background-color: #f1f5f8;
            .anticon-upload {
              padding: 5px 1em;
            }
          }
          .error {
            color: #e81c1c;
            h3 {
              color: #e81c1c;
            }
          }
          .field {
            padding: 5px;
            .catDIv {
              display: flex;
              .addButton {
                margin-right: 0;
                margin-left: 1em;
                margin-top: 0;
              }
            }
            .tagsDiv {
              margin-top: 1em;
              .ant-input{
                width: 78px;
              }
              .tagSpan{
                display: inline-block;
              }
              .site-tag-plus {
                background: #fff;
                border-style: dashed;
              }
              .empty {
                border-color: #e81c1c;
                box-shadow: 0 0 10px red !important;
                color: #e81c1c;
              }
            }
          }
        }
      }
    }
  }
`;
export { ExtensionStyle };
