import styled from "styled-components";
import { bg } from "components/Images";
const SupportStyle = styled.div`
  display: flex;
  .allDiv {
    padding: 1px !important;
    position: relative;
    :before {
      content: "";
      background-image: url(${bg});
      background-size: cover;
      height: 94vh;
      width: 100%;
      position: absolute;
      filter: blur(5px);
    }
    .mainForm {
      padding: 3em 1em 3em;
      .form_div {
        background-color: #ffff;
        margin: 0 auto;
        max-width: 30em;
        border-radius: 5px;
        box-shadow: 0 0 10px rgb(0, 0, 0, 0.2);
        padding: 2em 3em;
        position: relative;
        .field {
          margin-top: 1em;
        }
      }
    }
  }
`;

export { SupportStyle };
