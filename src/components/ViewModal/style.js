import styled from "styled-components";
import { size } from "App/device";
import { Theme } from "App/theme";
const ModalStyle = styled.div`
  .ant-modal {
    margin-top: 1em;
  }
  .ant-modal-content {
    border-radius: 10px;
    @media ${size["tablet-sm-max"]} {
      margin: 5%;
    }
    .ant-modal-close-x {
      color: #fff;
    }
    .ant-modal-header {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background-color: ${Theme.mainColor};
      .ant-modal-title {
        color: #fff;
        font-weight: 700;
        font-size: 20px;
        text-align: center;
      }
    }
    .ant-modal-body {
      padding: 1rem 1rem;
      font-size: 15px;
      .modelFront {
        font-weight: bold;
        display:flex;
      }
      .space {
        width: 1em;
        text-align: center;
      }
      .buttonDiv {
        display: flex;
        justify-content: center;
        margin-top: 1em;
      }
      .pdfDiv a {
        color: ${Theme.mainColor};
      }

      td {
        p {
          margin-bottom: 0;
          line-break: anywhere;
        }
        .ant-image {
          mheight: 5em;
          width: 6em;
        }
      }
      .viewTable {
        overflow: auto;
        .ant-table {
          .ant-table-container {
            border-left: none;
          }
          .ant-table-content {
            table {
              border-top: none;
              .ant-table-thead,
              .ant-table-tbody {
                tr {
                  th,
                  td {
                    padding: 8px 7px;
                    border-right: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export { ModalStyle };
