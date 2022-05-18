import styled from "styled-components";

const FormWrapper = styled.div`
  padding: 0;
  margin: 0;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
  .ant-select {
    width: 100%;
    .ant-select-selector {
      height: 2.5rem;
      border-radius: 8px;
      input {
        height: 2.5rem !important;
        color: #000;
      }
    }
  }
  .autoempty {
    .ant-select-selector {
      border: 1px solid #e81c1c;
      box-shadow: 0 0 10px red !important;
    }
  }
`;

export { FormWrapper };
