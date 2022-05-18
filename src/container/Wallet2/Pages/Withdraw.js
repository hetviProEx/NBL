import React, { Component } from "react";
import { message, Modal } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { SearchOutlined, QuestionCircleOutlined } from "@ant-design/icons";

import { RemoveConst } from "App/AppConstant";
import { WalletConst } from "../constatnt";
import { configVar } from "modules/config";
import { Input, Table, Button, Pagination } from "components/Form";
import {
  saveWithdraw,
  getWithdrawList,
  getWalletDataById,
  deleteWithdrawRequest,
} from "redux/wallet/action";

const { confirm } = Modal;

class Withdraw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      reqAmount: "",
      remarek: "",
      reqError: false,
      reqMoreError: false,
      btnDisable: false,
      visible: false,
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
      const { userId } = this.props;
      paramet.parameter = userId.toString();
      await this.props.getWithdrawList(paramet);
    } catch (error) {
      console.log(error);
    }
  }
  handleWithdraw = (e) => {
    try {
      const { availAmo } = this.props;
      const { reqMoreError } = this.state;
      this.setState({
        reqAmount: e.target.value.trim(),
        reqError: e.target.value.trim() !== "" ? false : true,
        reqMoreError: reqMoreError
          ? parseFloat(e.target.value.trim()) <= availAmo
            ? false
            : true
          : false,
      });
    } catch (error) {
      console.log(error);
    }
  };
  handlePagination = async (val) => {
    try {
      const { paramet } = this.state;
      paramet.page = val.toString();
      await this.props.getWithdrawList(paramet);
      this.setState({ current: val });
    } catch (error) {
      console.log(error);
    }
  };
  searchChange = async (e) => {
    try {
      const { paramet } = this.state;
      paramet.search = e.target.value.trim();
      paramet.page = "1";
      this.setState({ current: 1 });
      await this.props.getWithdrawList(paramet);
    } catch (error) {
      console.log(error);
    }
  };
  deleteCol = (id) => {
    try {
      confirm({
        title: RemoveConst.remove + WalletConst.requst,
        icon: <QuestionCircleOutlined />,
        content:
          RemoveConst.deleteMessage +
          WalletConst.requst.toLowerCase() +
          RemoveConst.que,
        okText: RemoveConst.yes,
        okType: "danger",
        cancelText: RemoveConst.no,
        getContainer: () => document.getElementById("wallet-Remove"),
        onOk: () => {
          this.removeCol(id);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  downloadFile = (url) => {
    try {
      // let txt = url.replace(/\\/g, "%5C");
      let downURL = configVar.BASE_URL.slice("/", -1)+ url;
      downURL = downURL.replace(/[^\x00-\x7F]/g, "");
      var win = window.open(downURL, "_blank");
      win.focus();
    } catch (error) {
      console.log(error);
    }
  };
  removeCol = async (id) => {
    const { paramet } = this.state;
    await this.props.deleteWithdrawRequest(id);
    await this.props.getWithdrawList(paramet);
  };
  handleSubmit = async () => {
    try {
      const { reqAmount, paramet } = this.state;
      const { availAmo, userId } = this.props;
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      let flag = false;
      if (!(parseInt(reqAmount) <= availAmo)) {
        flag = true;
        this.setState({ reqMoreError: true });
        message.error("The Request For Withdrawal Is More Then Available.");
      }
      if (!flag) {
        let sendData = {
          withdrawalid: 0,
          requestamount: parseFloat(reqAmount),
          userId: userId,
        };
        this.setState({
          reqAmount: "",
          reqError: false,
          reqMoreError: false,
        });
        await this.props.saveWithdraw(sendData);
        await this.props.getWithdrawList(paramet);
        await this.props.getWalletDataById(userId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { reqError, reqMoreError, btnDisable, reqAmount, current } =
      this.state;
    const { withdrawList, showComment } = this.props;
    let withdrawLength =
      withdrawList?.length > 0 ? withdrawList[0].totalLenght : 0;
    return (
      <div className="contentDiv anime">
        <div className="wdHead">
          <div className="addDiv">
            <Input
              value={reqAmount}
              placeholder={WalletConst.withDra}
              className={`inputBox ${reqError || reqMoreError ? "empty" : ""}`}
              type="number"
              max={25}
              onChange={this.handleWithdraw}
            />
            <Button
              disabled={btnDisable}
              className="btn-head"
              onClick={() => this.handleSubmit()}
            >
              {WalletConst.add}
            </Button>
          </div>
          <div className="searchdiv">
            <Input
              placeholder={WalletConst.search}
              suffix={<SearchOutlined />}
              onChange={this.searchChange}
            />
          </div>
        </div>
        <div className="tableDiv">
          <Table
            current={current}
            data={withdrawList}
            type="withdraw"
            download={this.downloadFile}
            deleteRecord={this.deleteCol}
            commentRecord={showComment}
          />
          {withdrawLength > 10 && (
            <div className="pagiDiv">
              <Pagination
                onChange={this.handlePagination}
                current={current}
                total={withdrawLength}
                pageSize={10}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  withdrawList: state.wallet.withdrawList,
});
const mapDispatchToProps = (dispatch) => ({
  saveWithdraw: (payload) => dispatch(saveWithdraw(payload)),
  getWithdrawList: (payload) => dispatch(getWithdrawList(payload)),
  getWalletDataById: (payload) => dispatch(getWalletDataById(payload)),
  deleteWithdrawRequest: (payload) => dispatch(deleteWithdrawRequest(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Withdraw)
);
