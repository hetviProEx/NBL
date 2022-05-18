import styled from "styled-components";
import { loginPage } from "components/Images";
import { size } from "App/device";
import { Theme } from "App/theme";

const LoginStyle = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #fff;
  @media ${size["laptop-max"]} {
    background-color: ${Theme.mainColor};
  }
  .ant-spin-container {
    padding: 0 !important;
  }
  .ant-row {
    @media ${size["mobile-md-max"]} {
      padding: 0 1em;
    }
    .loginFirst {
      background-image: url(${loginPage});
      height: 100vh;
      width: 50%;
      background-repeat: no-repeat;
      background-size: auto 100%;
      background-position: right;
      .image-top {
        margin: 2em 0 0 4em;
      }
      .heading {
        color: white;
        font-size: 20px;
        margin-left: 5em;
      }
      .my-auto {
        margin-top: auto;
        margin-bottom: auto;
        margin-right: 14%;
        .image-middle {
          margin: 2em 5em;
          height: 15em;
        }
        .pragraph {
          color: white;
          margin-left: 4em;
          font-size: large;
          .first {
            margin-bottom: -10px;
          }
          h1 {
            color: #fff;
          }
          h4 {
            color: rgba(255, 255, 255, 0.7);
          }
        }
        .ant-carousel .slick-dots-bottom {
          bottom: 0;
          top: 30em;
        }
      }
    }
    .signIn {
      margin-left: 3em;
      @media ${size["laptop-max"]} {
        border-radius: 10px;
        min-width: 220px;
        width: 100vw;
        max-width: 460px;
        position: relative;
        box-shadow: 0 30px 60px 0 rgb(0, 0, 0, 0.3);
        border: 2em solid transparent;
        background-color: #fff;
        margin: auto;
        margin-top: 5%;
      }
      .formDiv {
        min-height: 55vh;
        @media ${size["laptop-max"]} {
          width: 100%;
        }
        .header-login {
          font-weight: 700;
          font-size: 34px;
          margin: 3em 0 1em;
          @media ${size["laptop-max"]} {
            margin-top: 0;
            margin-bottom: 10px;
          }
        }
        .input {
          max-width: 25em;
          margin-bottom: 1em;
        }
        .rememberDiv {
          display: flex;
          max-width: 27em;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          @media ${size["mobile-md-max"]} {
            display: block;
            .ant-checkbox-wrapper {
              margin-bottom: 0.7em;
            }
          }
          .forgetPwd {
            color: #4a5568;
            font-weight: 400;
            @media ${size["mobile-md-max"]} {
              margin-top: 5px;
            }
          }
        }
        .btnLogin {
          margin-top: 2em;
          button + button {
            margin-left: 1em;
          }
        }
        .privPoliDiv {
          margin-top: 6em;
          .txt {
            color: ${Theme.mainColor};
          }
          @media ${size["laptop-max"]} {
            margin-top: 3em;
          }
        }
      }
    }
  }
`;
export { LoginStyle };
