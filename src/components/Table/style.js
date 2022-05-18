import styled from "styled-components";
import { Theme } from "App/theme";

const TableStyle = styled.div`
  .ant-spin-container {
    padding: 0 !important;
  }
  .ant-table {
    background-color: transparent;
    .ant-table-container {
      border-left: none;
    }
    .ant-table-content table {
      border-top: none !important;
      .center {
        text-align: center;
      }
      tr {
        th,
        td {
          border: none;
          border-right: none !important;
          border-bottom: 1px solid #e2e8f0;
        }
        th {
          border-bottom: 2px solid #e2e8f0;
        }
      }
      .ant-table-thead > tr > th,
      .ant-table-tbody > tr > td,
      .ant-table tfoot > tr > th,
      .ant-table tfoot > tr > td {
        padding: 8px 7px;
        vertical-align: top;
      }
      .ant-table-tbody .rowDeactive {
        color: #b3b3b3;
      }
      .ant-table-tbody .rowHover {
        :hover {
          color: ${Theme.mainColor};
          .actionUI {
            color: ${Theme.mainColor};
          }
          .contactUI a {
            color: ${Theme.mainColor};
          }
        }
      }
      .ant-table-pagination-right {
        justify-content: center;
      }
      .ant-pagination-item-link {
        color: #616161;
      }
      .actionUI {
        display: flex;
        // justify-content: center;
        color: black;
        z-index: 1000;
        .fas {
          color: ${Theme.baseColor};
          :hover {
            color: ${Theme.mainColor};
          }
        }
        .edit_box {
          margin: 0 10px;
        }
        .dash {
          font-size: 15px;
        }
      }
      .statusUI {
        display: flex;
        font-weight: 500;
        .green {
          color: #10c900;
        }
        .red {
          color: #ed3437;
        }
      }
      .tagUI{
        border-radius: 5px;
      }
    }
  }
  .ledTable {
    .ant-table .ant-table-content table {
      border-spacing: 0px 10px;
      tr {
        th {
          background: #fff;
          border: none;
        }
        td {
          border-bottom: none;
          background-color: #f1f5f8;
          :first-child {
            padding-left: 10px;
            border-radius: 10px 0 0 10px;
          }
          :last-child {
            border-radius: 0 10px 10px 0;
          }
        }
      }
    }
    .ant-table-thead {
      tr th {
        padding: 1em 7px !important;
      }
      th .ant-table-column-has-sorters:hover {
        background: none;
      }
    }
    .ant-table-tbody {
      .contactUI a {
        cursor: pointer;
        color: #636363;
      }
    }
  }
`;
export default TableStyle;
