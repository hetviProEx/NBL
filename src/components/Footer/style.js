import styled from "styled-components";
import { facebook, facebook1, linkedin, linkedin1 } from "components/Images";
const Wrapper = styled.div`
  .fbimg {
    background-image: url(${facebook});
    width: 20px;
    height: 18px;
    background-size: cover;
    background-repeat: no-repeat;
    margin-right: 5px;
    margin-bottom: 3px;
    :hover {
      background-image: url(${facebook1});
    }
  }
  .lkimg {
    background-image: url(${linkedin});
    width: 19px;
    height: 19px;
    background-size: cover;
    background-repeat: no-repeat;
    margin-right: 7px;
    margin-bottom: 3px;
    :hover {
      background-image: url(${linkedin1});
    }
  }
  .switcher-logo-w {
    height: 3em !important;
    width: 8em;
  }
`;

export { Wrapper };
