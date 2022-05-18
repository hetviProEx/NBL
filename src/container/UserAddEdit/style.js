import styled from "styled-components";

const NewUserStyle = styled.div`
  display: flex;
  .allDiv {
    .formDiv {
      margin-top: 1em;
      border-radius: 1em;
      padding: 1em;
      background-color: #ffff;
      box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
      .field .text:first-child {
        margin-left: 0;
      }
    }
    .mainStep {
      padding: 0 20%;
    }
  }
`;
export { NewUserStyle };
