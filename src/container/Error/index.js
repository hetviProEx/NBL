import React, { Component } from "react";
import { withRouter } from "react-router";

import ErrorStyle from "./style";
import { Button } from "components/Form";
import { error } from "components/Images";

class Error extends Component {
  render() {
    return (
      <ErrorStyle>
        <div class="mainDiv">
          <div class="imgDiv">
            <img alt="Template" class="h-48 lg:h-auto" src={error} />
          </div>
          <div class="txtDiv">
            <div class="font big">404</div>
            <div class="font">Oops. This page has gone missing.</div>
            <div class="font small">
              You may have mistyped the address or the page may have moved.
            </div>
            <Button
              bgcolor="secondary"
              onClick={() => this.props.history.push("/")}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </ErrorStyle>
    );
  }
}
export default withRouter(Error);
