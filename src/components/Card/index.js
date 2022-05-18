import React, { Component } from "react";
import { Card } from "antd";
export default class index extends Component {
  render() {
    const { content, title, extra } = this.props;
    return (
      <Card title={title} extra={extra ? extra : ""}>
        {content}
      </Card>
    );
  }
}
