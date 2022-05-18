import styled from "styled-components";

const UserRoleStyle = styled.div`
  .tableDiv {
    padding-top: 1em;
    overflow-x: auto;
    table {
      width: 100%;
      border-collapse: collapse;
      thead tr {
        border-bottom: 1px solid #dddddd;
        border-top: 1px solid #dddddd;
      }
      td,
      th {
        text-align: center;
        padding: 8px;
      }
      .text {
        padding: 8px 8px 8px 20px;
        font-weight: 600;
        width: 3em;
      }
    }
  }
  .btnDiv {
    margin-right: 1em;
    Button {
      width: 8em;
    }
  }
`;
export { UserRoleStyle };
