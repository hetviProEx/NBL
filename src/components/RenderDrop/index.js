import React, { Component } from "react";
import { Menu, Dropdown } from "antd";
import { StyleComponent } from "./style";

class RenderDrop extends Component {
  menu = () => {
    const { data, children } = this.props;
    return (
      <Menu>
        {!data ? (
          <Menu.Item key="1">{children}</Menu.Item>
        ) : (
          data?.map((a, i) => a && <Menu.Item key={i + 1}>{a}</Menu.Item>)
        )}
      </Menu>
    );
  };
  render() {
    const { item, id } = this.props;
    let cls = id ? "render-form" + id : "render-form";
    return (
      <StyleComponent>
        <div id={cls}>
          <Dropdown
            destroyPopupOnHide
            placement="bottomRight"
            overlay={this.menu()}
            trigger={["click"]}
            getPopupContainer={() => document.getElementById(cls)}
          >
            {item}
          </Dropdown>
        </div>
      </StyleComponent>
    );
  }
}

export default RenderDrop;
