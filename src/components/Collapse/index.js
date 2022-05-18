import React, { Component } from "react";
import { Collapse } from "antd";
import { StyleContainer } from "./style.js";
const { Panel } = Collapse;

export default class Colla extends Component {
  render() {
    const { panelData } = this.props;
    return (
      <StyleContainer>
        <Collapse expandIconPosition="right" accordion defaultActiveKey={["0"]}>
          {panelData?.map((data, i) => (
            <Panel header={data.header} key={i}>
              {data.body}
            </Panel>
          ))}
        </Collapse>
      </StyleContainer>
    );
  }
}
