import React, { Component } from "react";
import { Steps } from "antd";
import { StepsStyle } from "./style";
const { Step } = Steps;

class StepsPage extends Component {
  stepUI = () => {
    try {
      const { StepsName } = this.props;
      return StepsName?.map((a, i) => <Step title={a} key={i} />);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { stepCount, setPage } = this.props;
    return (
      <StepsStyle className="mainStep">
        <Steps current={stepCount} responsive={false} onChange={setPage}>
          {this.stepUI()}
        </Steps>
      </StepsStyle>
    );
  }
}
export default StepsPage;
