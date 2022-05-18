import styled from "styled-components";
import { bg } from "components/Images";
import { size } from "App/device";

const ChangePWDStyle = styled.div`
  display: flex;
  .allDiv {
    padding: 1px !important;
    position: relative;
    :before {
      background-image: url(${bg});
      content: "";
      background-size: cover;
      height: 85vh;
      width: 100%;
      position: absolute;
      filter: blur(5px);
    }
    .form_div {
      background-color: #ffff;
      margin: 10% auto;
      max-width: 30em;
      border-radius: 5px;
      box-shadow: 0 0 10px rgb(0, 0, 0, 0.2);
      padding: 2em 3em;
      @media ${size["mobile-md-max"]} {
        margin: 2rem;
      }
      .field {
        margin-top: 1em;
      }
    }
  }
`;

export { ChangePWDStyle };
