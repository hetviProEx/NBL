import React, { Component } from "react";
import { Spin } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { NewUserStyle } from "./style";
import { UserConst, StepsName } from "./constant";
import UserInfo from "./pages/UserInfo";
import UserRole from "./pages/UserRole";
import { getUserById } from "redux/user/action";
import { Menu, Header, StepsPage } from "components/Form";

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, data: {} };
  }
  async componentDidMount() {
    try {
      const { match } = this.props;
      if (match.params.id) {
        let id = window.atob(match.params.id);
        await this.props.getUserById(id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { userById } = this.props;
      if (prevProps.userById !== userById) {
        this.setState({ data: userById });
      }
    } catch (error) {
      console.log(error);
    }
  }
  countInc = (userData) => {
    try {
      const { count } = this.state;
      this.setState({ count: count + 1, data: userData });
    } catch (error) {
      console.log(error);
    }
  };
  pageUI = () => {
    try {
      const { count, data } = this.state;
      return count === 0 ? (
        <UserInfo data={data} countInc={this.countInc} />
      ) : count === 1 ? (
        <UserRole data={data} />
      ) : (
        ""
      );
    } catch (error) {
      console.log(error);
    }
  };
  setPage = (c) => this.setState({ count: c });
  render() {
    const { count } = this.state;
    const { match, data, loading } = this.props;
    return (
      <Spin spinning={loading} size="large">
        <NewUserStyle>
          <Menu />
          <div className="container">
            <Header title={"User"} />
            <div className="allDiv anime" id="user-form">
              <h2 className="hrob">
                {match.path === "/user/new"
                  ? UserConst.addUser
                  : UserConst.editUser}
              </h2>
              <div className="formDiv">
                <StepsPage
                  stepCount={count}
                  StepsName={StepsName}
                  setPage={match.params.id && this.setPage}
                />
                {this.pageUI(data)}
              </div>
            </div>
          </div>
        </NewUserStyle>
      </Spin>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.user.loading,
  user: state.user.user,
  userById: state.user.userById,
});
const mapDispatchToProps = (dispatch) => ({
  getUserById: (id) => dispatch(getUserById(id)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewUser)
);
