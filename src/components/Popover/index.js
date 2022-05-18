import React, { Component } from "react";
import { Popover } from "antd";
export default class PopoverUI extends Component {
  render() {
    const { content, children } = this.props;
    return (
      <Popover content={content} trigger="hover">
        {children}
      </Popover>
    );
  }
}
