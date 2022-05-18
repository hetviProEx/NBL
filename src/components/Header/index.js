import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { Image, Modal, Breadcrumb } from "antd";
import { connect } from "react-redux";
import { QuestionCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { headConst } from "./constant";
import { StyleComponent } from "./style";
import { RemoveConst } from "App/AppConstant";
import { logout } from "redux/login/actions";
import { getUserById } from "redux/user/action";
import { RenderDrop, Popover } from "components/Form";
import { getAuthRole, getAuthUserID, getAuthUserName } from "modules/helper";
import { logo, logoWhite, logoutImg, lock, user } from "components/Images";

var userRole = getAuthRole();
var userId = getAuthUserID();
var name = getAuthUserName();
const { confirm } = Modal;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      hidden: false,
      read: false,
      width: "86%",
    };
  }
  async componentDidMount() {
    try {
      userRole = userRole ? userRole : getAuthRole();
      userId = userId ? userId : getAuthUserID();
      name = name ? name : getAuthUserName();
      let type = localStorage.auth && JSON.parse(localStorage.auth).role;
      type && this.setState({ type: type });
      // type !== "ADMIN" && (await this.props.getNotification(userId));
      if (type === "user") {
        await this.props.getUserById(userId);
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    const { notification, userById } = this.props;
    if (prevProps.userById !== userById) {
      if (userById?.userId && userById?.userId === userId) {
        let a = [];
        userById.rights.forEach((b) => {
          b.ischeck && a.push(b.rightsName);
          b.ischeck && a.push(b.rightsId);
        });
        sessionStorage.setItem("rights", window.btoa(a));
      }
    }
    if (notification !== prevProps.notification) {
      let read = false;
      notification.forEach((a) => {
        if (a.isread === 0) read = true;
      });
      this.setState({ read });
    }
  }
  iconUI = (cls, url) => (
    <Popover content={url.substring(1)} trigger="hover">
      <i
        className={"fas " + cls}
        onClick={() => this.props.history.push(url.toLowerCase())}
      ></i>
    </Popover>
  );
  openMenu = async () => {
    try {
      this.handleVisible(false);
      await this.props.toggleCheckPwd(true);
    } catch (error) {
      console.log(error);
    }
  };
  logoutWarn = () => {
    try {
      confirm({
        title: RemoveConst.logout,
        icon: <QuestionCircleOutlined />,
        okText: RemoveConst.yes,
        cancelText: RemoveConst.no,
        content: RemoveConst.logMessage,
        okType: "danger",
        getContainer: () => document.getElementById("App"),
        onOk: () => {
          Modal.destroyAll();
          this.props.logout();
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  allNotif = () => {
    try {
      const { notification } = this.props;
      return notification?.map((a, i) => (
        <div
          key={i}
          className={`notify-border ${!a.isread ? "read" : ""}`}
          onClick={() => this.redirect(a.title, a.id)}
        >
          <span className="not-mrg">
            <div className="not-txt">{a.title}</div>
            <div className="not-txt"> {a.notification}</div>
          </span>
          {!a.isread && (
            <CloseCircleOutlined
              className="croIcon"
              onClick={() => this.readNotify(a.id)}
            />
          )}
        </div>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  changeURL = (url) => {
    try {
      let a = url.replace(/ /g, "-");
      if (url === "Dashboard") a = "";
      return "/" + a.toLowerCase();
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { show, history, title, child } = this.props;
    let allwidth = window.innerWidth;
    let admin = userRole === "admin";
    let partner = userRole === "partner";
    let txt = admin ? headConst.admin : name ? name : "";
    // const { read } = this.state;notification
    // style={{ backgroundColor: admin ? Theme.adColor : Theme.mainColor }}
    return (
      <StyleComponent className={!show ? "" : "show"}>
        <div className="maindiv" id="menu-form">
          <div className="head-container">
            <div className="all">
              <div>
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <NavLink to="/">
                      <h3 className="main">{headConst.nbl}</h3>
                    </NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <NavLink to={this.changeURL(child ? title + "s" : title)}>
                      <h3>{title}</h3>
                    </NavLink>
                  </Breadcrumb.Item>
                  {child && (
                    <Breadcrumb.Item>
                      <NavLink to={this.changeURL(title + "/" + child)}>
                        <h3>{child}</h3>
                      </NavLink>
                    </Breadcrumb.Item>
                  )}
                </Breadcrumb>
              </div>
            </div>
            <div className="dropDiv">
              <h5 className="txt txtWrap">{headConst.hel + txt}</h5>
              <div className="flex">
                {partner && (
                  <>
                    {this.iconUI("fa-certificate", "/Certificate")}
                    {/* {this.iconUI("fa-shopping-cart", "/Cart")} */}
                    {this.iconUI("fa-wallet", "/Wallet")}
                    {/* <div className="headIcon">
                      <RenderDrop item={<i className="fas fa-bell"></i>}>
                        <div className="head-mrg">
                          <div className="notify-Txthead"> */}
                    {/* {notification.length === 0 && headConst.no} */}
                    {/* {headConst.notif} */}
                    {/* {notification.length > 0 && read && (<Button className="v-btn" onClick={() => this.readNotify(0)}>{headConst.va}</Button>)} */}
                    {/* </div>
                        </div> */}
                    {/* <div className="notify-scroll"> {this.allNotif()}</div> */}
                    {/* </RenderDrop>
                    </div> */}
                  </>
                )}
                <RenderDrop
                  item={<i className={"fas fa-user"}></i>}
                  data={[
                    !admin && (
                      <div onClick={() => history.push("/profile")}>
                        <Image src={user} width={18} preview={false} />
                        <div className="title">{headConst.profile}</div>
                      </div>
                    ),
                    <div onClick={() => history.push("/change-password")}>
                      <Image src={lock} preview={false} width={20} />
                      <div className="title">{headConst.changePwd}</div>
                    </div>,
                    <div onClick={() => this.logoutWarn()}>
                      <Image src={logoutImg} preview={false} width={20} />
                      <div className="title">{RemoveConst.logout}</div>
                    </div>,
                  ]}
                />
              </div>
            </div>
          </div>
          <NavLink to="/" className="flex mr-auto">
            <Image
              alt="logo"
              className="w-16"
              width={allwidth > 767 ? 180 : 70}
              src={allwidth > 767 ? logo : logoWhite}
              preview={false}
            />
          </NavLink>
        </div>
      </StyleComponent>
    );
  }
}
const mapStateToProps = (state) => ({
  userById: state.user.userById,
});
const mapStateToDispatch = (dispatch) => ({
  logout: () => dispatch(logout()),
  getUserById: (id) => dispatch(getUserById(id)),
});

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(Header));
