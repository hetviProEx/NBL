import styled, { createGlobalStyle } from "styled-components";
import { size } from "App/device";
import { Theme } from "App/theme";
import { file } from "components/Images";

export const AppContainer = styled.div`
  background-color: ${Theme.mainColor};
  .flex {
    display: flex;
  }
  .txtWrap {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .btnDiv {
    margin-top: 2em;
    button {
      margin-left: auto;
      display: block;
      span {
        margin-right: 5px;
      }
    }
    .nextDiv {
      display: flex;
      button + button {
        margin-left: 1em;
      }
    }
    @media ${size["tablet-md-max"]} {
      margin-top: 1em;
      button {
        margin: auto;
      }
    }
  }
  .optionui {
    margin: 5px;
    @media ${size["laptop-max"]} {
      display: block;
    }
    .ant-image {
      box-shadow: 0 0 10px rgb(0, 0, 0, 0.2);
    }
    .anticon-close {
      color: #fff;
      background-color: ${Theme.mainColor};
      margin-left: 5px;
    }
  }
  .zoom-in:hover {
    transition: all 0.3s linear;
    transform: scale3d(1.05, 1.05, 1.05);
  }
  .cardDiv {
    .report-box {
      position: relative;
      :hover {
        transition: all 0.3s linear;
        transform: scale3d(1.05, 1.05, 1.05);
      }
      :before {
        content: "";
        width: 90%;
        background: #f9fafc;
        position: absolute;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        margin-top: 0.75rem;
        height: 100%;
        border-radius: 0.375rem;
        box-shadow: 0 3px 20px #0000000b;
      }
      .box {
        padding: 1.25rem;
        margin-right: 0;
        box-shadow: 0 3px 20px #0000000b;
        position: relative;
        border-radius: 0.375em;
        border-color: transparent;
        background-color: #fff;
        .ant-image {
          margin-left: auto;
        }
      }
    }
  }
  .pdfDiv iframe {
    width: 100vw;
  }
  .printDiv {
    background-color: #fff;
  }
  .file {
    width: 60%;
    height: 6em;
    display: block;
    color: #fff;
    padding-top: 3em;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${file});
  }
`;
const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  background-color: ${Theme.mainColor};
  font-size:14px;
  font-weight: 400;
  overflow-x: hidden;  
  background-repeat: no-repeat;
  background-attachment: fixed;
  // font-family: 'Roboto', sans-serif;
  font-family: 'Poppins', sans-serif;
}
.container{
  background: #f1f5f8;
  width:100%;
  overflow-y: auto;
  border-radius:2em;    
  overflow-x: hidden;
  overflow-y: hidden;
  margin: 1.25em 2em;
  margin-left:0;
  min-height: 90vh;
  @media ${size["laptop-max"]} {
    overflow-x: auto;
  }
  @media ${size["tablet-max"]} {
    margin: .25em;
  }
  .allDiv{
    height: 85vh;
    overflow-y: auto;
    padding: 1em 2em;
    @media ${size["tablet-max"]} {
      height: 80vh;
      padding: 1em;
    }
    .covDiv, .coverDiv{
      box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
      background-color: #fff;
      border-radius: 1em;
      .headDIV,.headerDiv{
        min-height: 4em;
        display: flex;
        align-items: center;
        color: ${Theme.mainColor};
        padding: 0 10px;
        border-bottom: 5px solid #f1f5f8;
        overflow-x: auto;
        .tabsDiv {
          display: flex;
          .tabComp {
            padding: 8px 20px;
            margin-right: 10px;
            color: ${Theme.mainColor};
            font-weight: 600;
            border-radius: 0.5em;
            background: #fff;
            @media ${size["mobile-md-max"]} {
              padding: 8px 3px;
              margin-right: 5px;
            }
            &.selectedTab,
            :hover {
              font-weight: 500;
              color: #fff;
              background: ${Theme.mainColor};
            }
          }
        }
        .actDIV ,.actionDiv{
          display: flex;
          margin-left: auto;
          .addButton {
            margin-top: 0;
          }
        }
        .actionDiv .addButton{
          margin-right: 10px;
          @media ${size["mobile-md-max"]} {
            margin-right: 3px;
          }
        }
      }
      .contDIV ,.contentDiv{
        padding: 0 10px;
        min-height: 10em;
        .search_div {
          margin-left: auto;
          padding-top: 1em;
          padding-right: 1em;
          max-width: 20rem;
        }
        .contHead{
          display: flex;
          align-items: center; 
          margin-top:1em; 
          padding-bottom: 1em;
          .srchDiv{
            margin-left: auto;
            max-width: 20em;
          }      
          .expoDiv{
            .exportDiv {
              display: flex;
              @media ${size["tablet-md-max"]} {
                margin-bottom: 1em;
              }
              .expo {
                display: flex;
                align-items: center;
                .exportAction {
                  border-right: 2px solid #e4e4e4;
                  padding: 5px 10px;
                  font-weight: 700;
                  color: ${Theme.mainColor};
                  :hover {
                    background-color: #e4e4e4;
                  }
                  @media ${size["mobile-md-max"]} {
                    padding: 5px 7px;
                  }
                }
                button {
                  background-color: transparent;
                  color: ${Theme.mainColor};
                  border-right: 2px solid #e4e4e4;
                  border-radius: 0;
                  padding: 9px;
                  font-weight: 700;
                  min-width: 3.5rem;
                  :hover {
                    background-color: #e4e4e4;
                  }
                  @media ${size["mobile-md-max"]} {
                    padding: 5px 7px;
                  }
                }
              }
            }
          }         
        }
        .tableDIV{
          margin-top:2em;
          overflow-x: auto;
          padding-bottom: 1em;
        }
      }
    }
  }
  .headDiv {
    display: flex;   
    overflow-y: auto;
    .rightDiv { 
      margin-left: auto;
      display: flex;
      .searchDiv {
        margin-right: 1em;
        max-width: 20em;
      }
    }
  }
}
.center{
  text-align: center;
}
h1,h2,h3,h4,h5,h6,h7 {
  color: ${Theme.mainColor};
  margin-bottom: 0;
  &.hrob {font-family: 'Roboto', sans-serif;}
}
overflow-y: scroll;
overflow-x: hidden;
scrollbar-color: transparent;
scrollbar-width: thin;
::-webkit-scrollbar {
  margin:5px;
  width: 7px; 
  height: 1px;
  background-color:#fff;
}
::-webkit-scrollbar-thumb {
  background-color:#f1f5f8;
}
.none {
  display: none;
}
.form-error {
  color: #e81c1c;
}
.pointer {
  cursor: pointer;
}
a {
  color: #fff; 
}
button[disabled]{
  opacity: 0.5;
  cursor: not-allowed;
}
.wordbr {
  word-break: break-all;
}
.pagiDiv {
  display: flex;
  margin-top: 1em;
  justify-content: end;
}
.addButton{
  margin-top: 5px;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5em;
  height: 1.5em;
  border-radius: 25px;
  background-color: ${Theme.mainColor};
  color: #ffff;
  font-size: 1.5em;
  line-height: 1;
  padding: 4px;
  stroke: white;
  stroke-width: 3em;
}
.fadeInDown {    
  animation-name: fadeInDown;
  animation-duration: 1s;   
  animation-timing-function: ease-in-out;   
  visibility: visible !important;   
}
@keyframes fadeInDown {
  0% {transform: translateY(-150%);}  
  100% {transform: translateY(0%);}	
}
.anime{
  opacity: 0;
  position: relative;
  animation: anime-animation 0.4s ease-in-out 0.33333s;
  animation-fill-mode: forwards;
  transform: translateX(50px);     
}
@-webkit-keyframes anime-animation {
  to {
    opacity: 1;
    transform: translatex(0);
  }
}
@keyframes anime-animation {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.anime:first-child{
  animation-delay: .1s;
}
.anime:nth-child(2){
  animation-delay: .2s;
}
.anime:nth-child(3){
  animation-delay: .3s;
}
.anime:nth-child(4){
  animation-delay: .4s;
}
.anime:nth-child(5){
  animation-delay: .5s;
}
.anime:nth-child(6){
  animation-delay: .6s;
}
.anime:nth-child(7){
  animation-delay: .7s;
}
.anime:nth-child(8){
  animation-delay: .8s;
}
.anime:nth-child(9){
  animation-delay: .9s;
}
.anime:nth-child(10){
  animation-delay: .91s;
}
.anime:nth-child(11){
  animation-delay: .92s;
}
.anime:nth-child(12){
  animation-delay: .93s;
}
.anime:nth-child(13){
  animation-delay: .94s;
}
.anime:nth-child(14){
  animation-delay: .95s;
}
.anime:nth-child(15){
  animation-delay: .96s;
}
.anime:nth-child(16){
  animation-delay: .97s;
}
.anime:nth-child(17){
  animation-delay: .98s;
}
.anime:nth-child(18){
  animation-delay: .99s;
}
.anime:nth-child(19){
  animation-delay: .991s;
}
.anime:nth-child(20){ 
  animation-delay: .992s;
}
.highZ{z-index: 22;}
.highZ2{z-index: 20;}
.highZ3{z-index: 18;}
.highZ4{z-index: 16;}
.highZ5{z-index: 24;}
`;

export default GlobalStyle;
