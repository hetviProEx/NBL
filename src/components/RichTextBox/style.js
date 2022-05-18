import styled from "styled-components";

const StyleCont = styled.div`
  .rdw-editor-wrapper {
    border: 1px solid #dadada;
    border-radius: 8px;
    margin-bottom: 1em;
    .rdw-editor-toolbar,
    .rdw-editor-main {
      border-radius: 8px;
    }
    .rdw-editor-main {
      height: 10em;
      padding: 0 1em;
      margin-bottom: 0.3em;
    }
  }
  .empty{
    border: 1px solid #e81c1c;
    box-shadow: 0 0 10px red !important;
  }
`;
export { StyleCont };
