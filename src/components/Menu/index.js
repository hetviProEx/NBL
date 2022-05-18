import React, { Component } from "react";
import { Menu, Image } from "antd";
import { withRouter } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { StyledComponent } from "./style";
import { logoWhite } from "components/Images";
import { getAuthRole } from "modules/helper";
import { MenuItems, HelpMenu, CRMMenu, AdminItems } from "./constant";

var role = getAuthRole();
const { SubMenu } = Menu;

class MenuComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titlekey: "",
      type: "",
      path: "",
      openKey: ["0"],
      rights: [],
    };
  }
  async componentDidMount() {
    try {
      const { location } = this.props;
      role = role ? role : getAuthRole();
      let type = localStorage.auth && JSON.parse(localStorage.auth).role;
      type && this.setState({ type: type });
      let path = location.pathname.slice(1).toLowerCase();
      this.setState({ path });
      let key = 0;
      HelpMenu.forEach((a) => {
        if (key === 0 && path.match(a.toLowerCase()?.split(" ")[0])) {
          this.setState({ openKey: ["5"] });
          key = 5;
        }
      });
      key === 0 &&
        CRMMenu.forEach((a) => {
          path.match(a.toLowerCase()) && this.setState({ openKey: ["1"] });
        });
    } catch (error) {
      console.log(error);
    }
  }
  setRigts = (a) => {
    try {
      if (role === "user") {
        a =
          a === "cms management" ? "cms" : a === "point of contact" ? "poc" : a;
        let rights = window.atob(sessionStorage.rights);
        return rights.match(a.replace(" ", ""));
      } else return true;
    } catch (error) {
      console.log(error);
    }
  };
  onOpenChange = (keys) => {
    const { openKey } = this.state;
    this.setState({ titlekey: keys[0] ? keys[0] : "" });
    const latestOpenKey = keys.find((key) => openKey.indexOf(key) === -1);
    if (["1", "5"].indexOf(latestOpenKey) === -1) {
      this.setState({ openKey: keys });
    } else this.setState({ openKey: latestOpenKey ? [latestOpenKey] : [] });
  };
  setOpenKeys = (keys) => {
    try {
      const { history } = this.props;
      this.setState({ titlekey: keys });
      let url = keys.key.toLowerCase();
      url = url.replace(/ /g, "-");
      url = url.replace("/", "-");
      history.push("/" + url);
    } catch (error) {
      console.log(error);
    }
  };
  iconUI = (cls) => <i key={cls} className={`fas ${cls}`}></i>;
  menuItem = () => {
    try {
      const { type, titlekey } = this.state;
      const { location } = this.props;
      let path = location.pathname.slice(1);
      let url = path.toLowerCase();
      url = url.replace(/-/g, " ");
      let mi = [];
      if (type === "admin") mi = AdminItems;
      else if (type === "user") {
        AdminItems?.forEach((a, i) => {
          if (i < 6) this.setRigts(a.toLowerCase()) && mi.push(a);
          else mi.push(a);
        });
      } else if (type === "partner") mi = MenuItems;
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
                  this.iconUI(
                    a === "Commission" ? "fa-percent" : "fa-photo-video"
                  )
                ) : i === 4 ? (
                  this.iconUI(
                    a === "Withdraw Request" ? "fa-money-check" : "fa-briefcase"
                  )
                ) : i === 5 ? (
                  a === "Media Kit" ? (
                    this.iconUI("fa-photo-video")
                  ) : (
                    <UserOutlined />
                  )
                ) : i === 6 && a === "CMS" ? (
                  this.iconUI("fa-briefcase")
                ) : i === 7 ? (
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
          let idx = menu.findIndex((a) => url.match(a.toLowerCase()));
          let cls = idx > -1 ? "active" : "";
          return (
            <SubMenu
              key={i}
              title={a}
              className={`anime ${cls}`}
              icon={
                a === "CRM"
                  ? this.iconUI("fa-hands-helping")
                  : this.iconUI("fa-question-circle")
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
  render() {
    const { openKey, path } = this.state;
    return (
      <StyledComponent>
        <div className="logo">
          <Image
            width={128}
            src={logoWhite}
            preview={false}
            className="pointer"
            onClick={() => this.setOpenKeys({ key: "" })}
          />
        </div>
        <hr />
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
      </StyledComponent>
    );
  }
}
export default withRouter(MenuComponent);
