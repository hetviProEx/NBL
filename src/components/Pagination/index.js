import React, { Component } from "react";
import { Pagination } from "antd";
class PaginationUI extends Component {
  render() {
    const { onChange, current, total, pageSize } = this.props;
    return (
      <Pagination
        current={current}
        total={total}
        onChange={onChange}
        pageSize={pageSize ? pageSize : 10}
      />
    );
  }
}
export default PaginationUI;