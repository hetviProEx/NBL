import React, { Component } from "react";
import { Modal, Spin } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  SearchOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { UserListStyle } from "./style";
import { UserListConst } from "./constant";
import { getAuthRole, getAuthUserID } from "modules/helper";
import { deleteUser, getUsers } from "redux/user/action";
import { ButtonConst, RemoveConst } from "App/AppConstant";
import {
  Menu,
  Header,
  Table,
  Input,
  Pagination,
  ViewModal,
} from "components/Form";
var role = getAuthRole();
var userID = getAuthUserID();

const { confirm } = Modal;
class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      viewData: {},
      viewModel: false,
      paramet: {
        parameter: "",
        pageSize: "10",
        page: "1",
        sortColumn: "id",
        search: "",
      },
    };
  }
  async componentDidMount() {
    try {
      const { paramet } = this.state;
      role = role ? role : getAuthRole();
      userID = userID ? userID : getAuthUserID();
      if (role === "partner") this.props.history.push("/dashboard");
      else await this.props.getUsers(paramet);
    } catch (error) {
      console.log(error);
    }
  }
  searchChange = async (e) => {
    try {
      const { paramet } = this.state;
      paramet.search = e.target.value.trim();
      paramet.page = "1";
      this.setState({ currentPage: 1 });
      await this.props.getUsers(paramet);
    } catch (error) {
      console.log(error);
    }
  };
  handlePagination = async (val) => {
    try {
      let parameter = this.state.paramet;
      parameter.page = val.toString();
      await this.props.getUsers(parameter);
      this.setState({ currentPage: val });
    } catch (error) {
      console.log(error);
    }
  };
  deleteCol = async (id) => {
    try {
      confirm({
        title: RemoveConst.header + UserListConst.user,
        icon: <QuestionCircleOutlined />,
        content:
          RemoveConst.deleteMessage +
          UserListConst.user.toLowerCase() +
          RemoveConst.que,
        okText: RemoveConst.yes,
        okType: "danger",
        cancelText: RemoveConst.no,
        getContainer: () => document.getElementById("userList-form"),
        onOk: () => {
          this.removeCol(id);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  removeCol = async (id) => {
    try {
      const { paramet } = this.state;
      await this.props.deleteUser(id);
      await this.props.getUsers(paramet);
    } catch (error) {
      console.log(error);
    }
  };
  setRigts = (a) => {
    try {
      if (role === "user") {
        let rights = window.atob(sessionStorage.rights);
        return rights.match(a);
      } else return true;
    } catch (error) {
      console.log(error);
    }
  };
  viewPartner = (id) => {
    try {
      const { viewModel } = this.state;
      const { userList } = this.props;
      let vdata = userList.find((x) => x.id === id);
      this.setState({ viewModel: !viewModel, viewData: vdata });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { loading, userList } = this.props;
    const { currentPage, viewModel, viewData } = this.state;
    let dataLength = userList?.length > 0 ? userList[0].totalLenght : 0;
    return (
      <Spin spinning={loading} size="large">
        <UserListStyle id="userList-form">
          <Menu />
          <div className="container">
            <Header title={"User"} />
            <div className="allDiv anime">
              <div className="covDiv">
                <div className="headDIV anime">
                  <h2 className="hrob">{UserListConst.userList}</h2>
                  <div className="actDIV">
                    {this.setRigts("usersadd") && (
                      <div
                        className="addButton pointer"
                        onClick={() => this.props.history.push("/user/new")}
                      >
                        <PlusOutlined />
                      </div>
                    )}
                  </div>
                </div>
                <div className="contDIV">
                  <div className="contHead anime">
                    {userList?.length > 0 && (
                      <div className="srchDiv">
                        <Input
                          placeholder={ButtonConst.search}
                          suffix={<SearchOutlined />}
                          onChange={this.searchChange}
                        />
                      </div>
                    )}
                  </div>
                  <div className="tableDIV">
                    <Table
                      current={currentPage}
                      type={"userList"}
                      data={userList}
                      size={10}
                      deleteRecord={this.deleteCol}
                      viewRecord={this.viewPartner}
                      editRecord={(id) =>
                        this.props.history.push("/edit-user/" + window.btoa(id))
                      }
                    />
                    {dataLength > 10 && (
                      <div className="pagiDiv">
                        <Pagination
                          onChange={this.handlePagination}
                          current={currentPage}
                          total={dataLength}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {viewModel && (
              <ViewModal
                data={viewData}
                title={"UserList"}
                visible={viewModel}
                onCancel={this.viewPartner}
                onOk={this.viewPartner}
              />
            )}
          </div>
        </UserListStyle>
      </Spin>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  user: state.user.user,
  userList: state.user.userList,
});
const mapDispatchToProps = (dispatch) => ({
  getUsers: (payload) => dispatch(getUsers(payload)),
  deleteUser: (id) => dispatch(deleteUser(id)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserList)
);
