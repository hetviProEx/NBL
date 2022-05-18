import styled from "styled-components";

const ViewStyle = styled.div`
  display: flex;
  .allDiv .coverDiv {
    margin-top: 1em;
    .contentDiv {
      border-bottom: 5px solid #f1f5f8;
      :last-child {
        border-bottom: none;
      }
      .detailDiv {
        padding: 1em;
        .ant-row{
          margin-bottom: 1em;
          background-color: #f1f5f8;
          border-radius: 10px;
          padding: 1em;
          .ant-col{
            .field{
              margin-top:1em;
              display:flex;
              h3{
                margin-right:5px;
              }
            }
          }
        }
      }
      .detailDiv,
      .tableDiv {
        h2 {
          margin-bottom: 1em;
        }
      }

      .tableDiv {
        padding: 1em;
        overflow-x: auto;
      }
    }
  }
`;
export { ViewStyle };
