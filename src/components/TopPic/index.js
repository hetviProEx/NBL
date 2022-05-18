import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Wrapper } from "./style";

class TopPic extends Component {
  render() {
    const { contact } = this.props;
    return (
      <Wrapper>
        <div
          className={`hero parallax is-cover is-relative is-default is-bold ${
            contact ? "conpic" : ""
          }`}
        >
          <div className="parallax-overlay"></div>
          <div className={`hero-body ${contact ? "pt-80 pb-80" : ""}`}>
            <div className="container has-text-centered">
              <div className="columns">
                <div className="column is-6 is-offset-3 has-text-centered is-header-caption">
                  <h1 className="title is-spaced main-title is-2">
                    {!contact ? "ABOUT US" : "Contact us"}
                  </h1>
                  <h2 className="subtitle is-5 light-text">
                    {!contact
                      ? "NBL is an innovation-driven company known for its niche in the domain of IT."
                      : "We are looking forward to hear from you. Don't hesitate, just tell us what's on your mind."}
                  </h2>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}
export default withRouter(TopPic);
