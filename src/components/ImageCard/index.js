import React, { Component } from "react";
import { Card } from "antd";

export default class index extends Component {
  render() {
    const { style, className, children, cover, hoverable } = this.props;
    return (
      <Card
        hoverable={hoverable}
        style={style}
        className={className}
        cover={cover}
      >
        {children}
      </Card>
    );
  }
}
