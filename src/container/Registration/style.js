import styled from "styled-components";
import { size } from "App/device";
import { Theme } from "App/theme";

const StyleContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-size: cover;
  background: ${Theme.mainColor};
  position: relative;
  overflow: hidden;
  .canvasDiv {
    position: absolute;
  }
  .logoDiv {
    text-align: center;
  }
  .form-div {
    border-radius: 10px;
    width: 30%;
    margin: auto;
    margin-top: 8%;
    padding: 2%;
    background-color: rgb(255, 255, 255);
    min-width: 220px;
    @media ${size["tablet-md-max"]} {
      padding: 5%;
      width: 40%;
    }
    @media ${size["tablet-max"]} {
      margin-top: 15%;
      width: 60%;
    }
    @media ${size["mobile-md-max"]} {
      width: 90%;
      padding: 10% 5%;
    }
    .head {
      font-size: 1.5em;
      font-weight: bold;
      margin-top: 1em;
      color: ${Theme.mainColor};
    }
    .ant-divider-inner-text {
      font-size: 10px;
    }
    .middle {
      .divider {
        border-left: 1px solid ${Theme.mainColor};
        height: 40%;
        margin: 0 50%;
      }
      .lbl {
        margin: 15px 40%;
      }
    }
    .loginDiv {
      .forgetlbl {
        font-size: 11px;
        position: absolute;
        right: 1px;
        color: ${Theme.mainColor};
      }
      .btmDiv {
        margin-top: 2rem;
        .lbl {
          position: absolute;
          left: 20%;
          color: ${Theme.mainColor};
          font-size: 12px;
        }
        .lblmore {
          left: 32%;
        }
      }
    }
    .btnDiv button {
      margin: auto;
    }
  }
`;
export { StyleContainer };
