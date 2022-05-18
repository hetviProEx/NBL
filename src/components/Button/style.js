import styled from "styled-components";
import { Theme } from "App/theme";
const Button = styled.button`
  background: ${(props) => props.bgcolor.background};
  color: ${(props) => props.bgcolor.color};
  cursor: pointer;
  border: 0;
  display: inline-block;
  // font-family: Roboto;
  position: relative;
  padding: 1em;
  // height: 35px;
  // width: auto;
  min-width: 6rem;
  // min-width: 60px;
  line-height: 1em;
  border-radius: 0.375rem;
  font-size: 1em;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: none;
  transition: all 0.4s ease;
  :hover,
  :focus {
    color: ${Theme.mainColor};
    background: #e2e2e2;
    outline: none;
  }
  .anticon {
    margin-right: 5px;
  }
`;

export { Button };
