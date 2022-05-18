import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { Image, Menu } from "antd";
import { StyleComponent } from "./style";
import { MenuItems, HelpMenu, CRMMenu, AdminItems } from "../Menu/constant";
import { logoWhite } from "components/Images";
import { MenuOutlined, UserOutlined, CloseOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;
class MobileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      path: "",
      titlekey: "",
      type: "",
      openKey: ["0"],
    };
  }
  componentDidMount() {
    try {
      let type = localStorage.auth && JSON.parse(localStorage.auth).role;
      type && this.setState({ type: type });
    } catch (error) {
      console.log(error);
    }
  }
  redirect = (url) => {
    try {
      let a = url.replace(/ /g, "-");
      this.props.history.push("/" + a.toLowerCase());
    } catch (error) {
      console.log(error);
    }
  };
  toggleMenu = () =>this.setState({ hidden: !this.state.hidden });
  checkUrl = (url) => {
    try {
      const { path } = this.state;
      let a = url.replace(/ /g, "-");
      return path === "/" + a.toLowerCase();
    } catch (error) {
      console.log(error);
    }
  };
  menuItem = () => {
    try {
      const { type, titlekey } = this.state;
      const { location } = this.props;
      let path = location.pathname.slice(1);
      let url = path.toLowerCase();
      url = url.replace("-", " ");
      let mi = [];
      if (type !== "partner") mi = AdminItems;
      else mi = MenuItems;
      return mi?.map((a, i) => {
        let cls =
          url.match(a.toLowerCase().slice(0, -1)) ||
          (url === "" && i === 0 && titlekey === "")
            ? "active"
            : "";
        if (a !== "CRM" && a !== "Help")
          return (
            <Menu.Item
              key={a}
              className={`anime side-menu ${cls}`}
              icon={
                i === 0 ? (
                  this.iconUI("fa-home")
                ) : (i === 2 || a === "Products") && a !== "Users" ? (
                  this.iconUI("fa-cubes")
                ) : i === 3 ? (
                  this.iconUI(a === "Commission" ? "fa-percent" : "fa-plug")
                ) : i === 4 ? (
                  this.iconUI("fa-photo-video")
                ) : i === 5 ? (
                  this.iconUI("fa-briefcase")
                ) : i === 6 ? (
                  this.iconUI("fa-database")
                ) : (
                  <UserOutlined />
                )
              }
            >
              {a}
            </Menu.Item>
          );
        else {
          let menu = a === "CRM" ? CRMMenu : HelpMenu;
          return (
            <SubMenu
              key={i}
              title={a}
              className="anime"
              icon={
                a === "CRM"
                  ? this.iconUI("fa-plug")
                  : this.iconUI("fa-hands-helping")
              }
            >
              {menu?.map((a) => (
                <Menu.Item
                  key={a}
                  className={`anime ${
                    url.match(a.toLowerCase()) ? "active" : ""
                  }`}
                >
                  {a}
                </Menu.Item>
              ))}
            </SubMenu>
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  onOpenChange = (keys) => {
    const { openKey } = this.state;
    this.setState({ titlekey: keys[0] ? keys[0] : "" });
    const latestOpenKey = keys.find((key) => openKey.indexOf(key) === -1);
    if (["1", "7"].indexOf(latestOpenKey) === -1) {
      this.setState({ openKey: keys });
    } else this.setState({ openKey: latestOpenKey ? [latestOpenKey] : [] });
  };
  setOpenKeys = (keys) => {
    try {
      const { history } = this.props;
      this.setState({ titlekey: keys, hidden: true });
      let url = keys.key.toLowerCase();
      url = url.replace(" ", "-");
      url = url.replace("/", "-");
      history.push("/" + url);
    } catch (error) {
      console.log(error);
    }
  };
  iconUI = (cls) => <i className={`fas ${cls}`}></i>;
  render() {
    const { hidden, openKey } = this.state;
    const { location } = this.props;
    let path = location.pathname.slice(1);
    return (
      <StyleComponent>
        <div className="mobile-menu">
          <div className="mobile-menu-bar">
            <NavLink to="/" className="flex mr-auto">
              <Image
                alt="logo"
                className="w-16"
                width={80}
                src={logoWhite}
                preview={false}
              />
            </NavLink>
            <div className="menuDiv" onClick={this.toggleMenu}>
              {hidden ? (
                <MenuOutlined className="feather" />
              ) : (
                <CloseOutlined className="feather" />
              )}
            </div>
          </div>
        </div>
        {!hidden && <hr />}
        {!hidden && (
          <Menu
            title="menu"
            mode="inline"
            openKeys={openKey}
            defaultSelectedKeys={path}
            onClick={this.setOpenKeys}
            onOpenChange={this.onOpenChange}
          >
            {this.menuItem()}
          </Menu>
        )}
      </StyleComponent>
    );
  }
}
export default withRouter(MobileMenu);
