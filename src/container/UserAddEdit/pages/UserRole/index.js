import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Button, Checkbox } from "components/Form";
import { UserRoleStyle } from "./style";
import { getAuthRole } from "modules/helper";
import { userRoleConst } from "../../constant";
import { saveUser } from "redux/user/action";
import { ButtonConst } from "App/AppConstant";
import { getAuthUserID } from "modules/helper";
var role = getAuthRole();
var userId = getAuthUserID();
class UserRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisable: false,
      isChecked: false,
      checkboxes: [],
      initState: {
        rightsid: "",
      },
      tableArray: [],
    };
  }
  async componentDidMount() {
    try {
      const { data } = this.props;
      let ids = [];
      userId = userId ? userId : getAuthUserID();
      if (data?.rights) {
        data.rights?.forEach((a, i) => {
          if (a.ischeck === 1) ids.push(a.rightsId);
        });
        this.setRigths(ids);
      } else this.setRigths([]);
    } catch (error) {
      console.log(error);
    }
  }
  setRigths = (ids) => {
    try {
      let data = [];
      for (let i = 0; i < 7; i++) {
        let item = {
          id: i,
          value:
            i === 0
              ? "Partners"
              : i === 1
              ? "Products"
              : i === 2
              ? "Users"
              : i === 3
              ? "Commission"
              : i === 4
              ? "MediaKit"
              : i === 5
              ? "Point of contact"
              : "CMS management"
              ,
          add: ids.includes(this.add(i)), //(this.setItem(i, 1)),
          edit: ids.includes(this.edit(i)), //(this.setItem(i, 2)),
          view: ids.includes(this.view(i)), //(this.setItem(i, 3)),
          delete: ids.includes(this.delete(i)), //(this.setItem(i, 4)),
          all: false,
        };
        if (item.add && item.edit && item.view && item.delete) item.all = true;
        data.push(item);
      }
      this.setState({ tableArray: data });
    } catch (error) {
      console.log(error);
    }
  };
  add = (i) =>
    i === 0
      ? 1
      : i === 1
      ? 5
      : i === 2
      ? 9
      : i === 3
      ? 13
      : i === 4
      ? 17
      : i === 5
      ? 21
      : 25;
  edit = (i) =>
    i === 0
      ? 2
      : i === 1
      ? 6
      : i === 2
      ? 10
      : i === 3
      ? 14
      : i === 4
      ? 18
      : i === 5
      ? 22
      : 26;
  view = (i) =>
    i === 0
      ? 3
      : i === 1
      ? 7
      : i === 2
      ? 11
      : i === 3
      ? 15
      : i === 4
      ? 19
      : i === 5
      ? 23
      : 27;
  delete = (i) =>
    i === 0
      ? 4
      : i === 1
      ? 8
      : i === 2
      ? 12
      : i === 3
      ? 16
      : i === 4
      ? 20
      : i === 5
      ? 24
      : 28;
  // setItem = (i, a) => a + i * 4;
  handleSubmit = async () => {
    try {
      const { data } = this.props;
      const { tableArray } = this.state;
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      let count = 1;
      let rights = [];
      tableArray?.forEach((a) => {
        if (a.add) rights.push({ rightsid: count });
        count = count + 1;
        if (a.edit) rights.push({ rightsid: count });
        count = count + 1;
        if (a.view) rights.push({ rightsid: count });
        count = count + 1;
        if (a.delete) rights.push({ rightsid: count });
        count = count + 1;
      });
    
      data.rights = rights;
      data.createdBy = userId;
      await this.props.saveUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  tdUI = (type, i, a, inx, disable) => (
    <td>
      <Checkbox
        checked={disable ? false : type}
        disabled={disable}
        onChange={() => this.onChange(i, a, inx)}
      />
    </td>
  );
  setDisable = (a) => {
    try {
      if (role === "user") {
        let rights = window.atob(sessionStorage.rights);
        let as = rights?.split(",");
        let c = as.find((b) => parseInt(b) === a);
        if (!c) return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  };
  tableBodyUI = () => {
    try {
      const { tableArray } = this.state;
      return tableArray?.map(
        (a, i) =>
          i !== 3 && (
            <tr key={i} className="anime">
              <td className="text">{a.value}</td>
              {this.tdUI(
                a.all,
                i,
                a,
                0,
                role === "user" &&
                  (this.setDisable(this.add(i)) ||
                    this.setDisable(this.edit(i)) ||
                    this.setDisable(this.view(i)) ||
                    this.setDisable(this.delete(i)))
              )}
              {this.tdUI(a.add, i, a, 1, this.setDisable(this.add(i)))}
              {this.tdUI(a.edit, i, a, 2, this.setDisable(this.edit(i)))}
              {this.tdUI(a.view, i, a, 3, this.setDisable(this.view(i)))}
              {this.tdUI(a.delete, i, a, 4, this.setDisable(this.delete(i)))}
            </tr>
          )
      );
    } catch (error) {
      console.log(error);
    }
  };
  onChange = (i, a, idx) => {
    try {
      const { tableArray } = this.state;
      let array = [...tableArray];
      array[i] = {
        id: a.id,
        value: a.value,
        all: idx === 0 ? !a.all : false,
        add: idx === 1 ? !a.add : idx === 0 ? !a.all : a.add,
        edit: idx === 2 ? !a.edit : idx === 0 ? !a.all : a.edit,
        view: idx === 3 ? !a.view : idx === 0 ? !a.all : a.view,
        delete: idx === 4 ? !a.delete : idx === 0 ? !a.all : a.delete,
      };
      if (array[i].add && array[i].edit && array[i].view && array[i].delete)
        array[i].all = true;
      this.setState({ tableArray: array });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { btnDisable } = this.state;
    return (
      <UserRoleStyle>
        <div className="tableDiv">
          <table>
            <thead>
              <tr className="anime">
                <th> </th>
                <th>{userRoleConst.all}</th>
                <th>{userRoleConst.add}</th>
                <th>{userRoleConst.edit}</th>
                <th>{userRoleConst.view}</th>
                <th>{userRoleConst.delete}</th>
              </tr>
            </thead>
            <tbody>{this.tableBodyUI()}</tbody>
          </table>
        </div>
        <div className="btnDiv">
          <div className="nextDiv">
            <Button onClick={() => this.props.history.push("/users")}>
              {ButtonConst.cancel}
            </Button>
            <Button disabled={btnDisable} onClick={this.handleSubmit}>
              {ButtonConst.submit}
            </Button>
          </div>
        </div>
      </UserRoleStyle>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.user.loading,
  user: state.user.user,
  // userById: state.user.userById,
});
const mapDispatchToProps = (dispatch) => ({
  saveUser: (payload) => dispatch(saveUser(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserRole)
);
