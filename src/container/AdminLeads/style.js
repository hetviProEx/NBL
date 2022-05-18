import styled from "styled-components";
import { size } from "App/device";

const AdmLeadStyle = styled.div`
  display: flex;
  .allDiv {
    .covDiv .contDIV .contHead {
      @media ${size["tablet-md-max"]} {
        display: block !important;
        .srchDiv {
          margin-left: 0 !important;
        }
      }
    }
  }
`;
export { AdmLeadStyle };
