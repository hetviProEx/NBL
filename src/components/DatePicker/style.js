import styled from "styled-components";

const StyledComponent = styled.div`
  width: 100%;
  .ant-picker {
    width: inherit;
    border: 1px solid #e4e4e4;
    border-radius: 8px;
    padding: 5px;
    input {
      height: 2.1em;
      color: #000;
    }
  }
  .ant-picker-suffix,
  .ant-picker-clear {
    color: #000;
  }
  .empty {    
    border: 1px solid #e81c1c;
    box-shadow: 0 0 10px red !important;
  }
  .ant-picker-content {
    height: 210px;
  }
`;

export { StyledComponent };
