import React, { Component } from "react";
import { Drawer } from "antd";

class FormDrawer extends Component {
  render() {
    const { title, visible, onClose, children } = this.props;
    return (
      <Drawer
        title={title}
        placement="right"
        visible={visible}
        onClose={onClose}
        getContainer={() => document.getElementById("form-Darwer")}
      >
        {children}
      </Drawer>
    );
  }
}
export default FormDrawer;
