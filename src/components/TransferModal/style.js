import styled from "styled-components";
import { size } from "App/device";
const ModalContainer = styled.div`
  .ant-modal-content {
    border-radius: 10px;
    @media ${size["tablet-sm-max"]} {
      margin: 5%;
    }
    .ant-modal-header {
      border-radius: 10px;
    }
    .ant-modal-body {
      padding: 1rem 1rem;
      .ant-col {
        display: flex;
        justify-content: center;
        margin-top: 1em;
      }
    }
  }
`;
export { ModalContainer };
