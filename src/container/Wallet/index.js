import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, InputNumber, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { WalletStyle } from "./style";
import {
  Menu,
  Button,
  Header,
  Input,
  Table,
  Pagination,
} from "components/Form";
import { getAuthUserID, getAuthRole } from "modules/helper";
import { topRowData, WalletConst } from "./constatnt";
import {
  getTaransactionHistory,
  getCurrentBalance,
  addWithdarawMoney,
} from "redux/wallet/action";
var userId = getAuthUserID();
var role = getAuthRole();
class Wallet extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      dataLength: 0,
      currentPage: 1,
      partnerId: "0",
      addMoney: "",
      withDraw: "",
      currBalance: 0,
      addMoneyError: false,
      addMoneyConError: false,
      withDrawError: false,
      withDrawConError: false,
      submitClicked: false,
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
      userId = userId ? userId : getAuthUserID();
      role = role ? role : getAuthUserID();
      const { paramet } = this.state;
      const { match } = this.props;
      let id = role !== "partner" ? window.atob(match.params.id) : userId;
      paramet.parameter = id.toString();
      await this.props.getTaransactionHistory(paramet);
      await this.props.getCurrentBalance(id);
      this.setState({ partnerId: id });
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { trHistory, currBal } = this.props;
      if (trHistory !== prevProps.trHistory) {
        if (trHistory?.length > 0)
          this.setState({ dataLength: trHistory[0]?.totalLenght });
      }
      if (currBal !== prevProps.currBal) {
        let balance = currBal?.length > 0 ? currBal[0]?.currentBalence : 0;
        this.setState({ currBalance: balance });
      }
    } catch (error) {
      console.log(error);
    }
  }
  searchChange = async (e) => {
    try {
      const { paramet } = this.state;
      paramet.search = e.target.value;
      paramet.page = "1";
      this.setState({ currentPage: 1 });
      await this.props.getTaransactionHistory(paramet);
    } catch (error) {
      console.log(error);
    }
  };
  handlePagination = async (val) => {
    try {
      const { paramet } = this.state;
      paramet.page = val.toString();
      await this.props.getTaransactionHistory(paramet);
      this.setState({ currentPage: val });
    } catch (error) {
      console.log(error);
    }
  };
  onChange = (value) => {
    console.log("changed", value);
  };
  handleSubmit = async (a) => {
    try {
      const { addMoney, withDraw, partnerId } = this.state;
      this.setState({ submitClicked: true });
      let flag = false;
      if (a === "Add Money") {
        if (addMoney.toString().trim() === "") {
          this.setState({ addMoneyError: true });
          flag = true;
        } else if (parseInt(addMoney) > 5000000) {
          this.setState({ addMoneyConError: true });
          flag = true;
        }
      } else if (a === "Withdraw") {
        if (withDraw.toString().trim() === "") {
          this.setState({ withDrawError: true });
          flag = true;
        } else if (parseInt(withDraw) > 5000000) {
          this.setState({ withDrawConError: true });
          flag = true;
        }
      }
      if (!flag) {
        let url = `/${a === "Add Money" ? addMoney + "/0" : withDraw + "/1"}`;
        await this.props.addWithdarawMoney(partnerId + url);
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleInput = (name, val) => {
    const { submitClicked } = this.state;
    try {
      this.setState({
        [name]: val,
        addMoneyError: name === "addMoney" && val.trim() === "",
        addMoneyConError:
          name === "addMoney" &&
          val.trim() !== "" &&
          submitClicked &&
          parseInt(val) > 5000000,
        withDrawError: name === "withDraw" && val.trim() === "",
        withDrawConError:
          name === "withDraw" &&
          val.trim() !== "" &&
          submitClicked &&
          parseInt(val) > 5000000,
      });
    } catch (error) {
      console.log(error);
    }
  };
  topRowUi = () => {
    try {
      const {
        addMoney,
        withDraw,
        addMoneyError,
        withDrawError,
        addMoneyConError,
        withDrawConError,
        currBalance,
      } = this.state;
      // let bal =currBalance &&parseFloat(currBalance)?.toFixed(2).replace(/\d(?=(\d{2})+\.)/g, "$&,");
      let bal =
        currBalance &&
        parseFloat(currBalance)
          ?.toLocaleString("en-IN")
          .replace(/\d(?=(\d{2})+\.)/g, "$&,");
      return topRowData?.map((a, i) => (
        <Col xs={24} sm={24} md={24} lg={24} xl={8} key={i}>
          <div className="cardDiv">
            <div className="report-box">
              <div className="box">
                <h3 className="name">{a.name}</h3>
                <div className="input-div ">
                  {i === 0 && bal && <h1 className="mark">{"₹ " + bal}</h1>}
                  {i !== 0 && (
                    <>
                      <Input
                        className={`inputBox ${
                          a.name === "Add Money" &&
                          (addMoneyError || addMoneyConError)
                            ? "empty-field"
                            : "" ||
                              (a.name === "Withdraw" &&
                                (withDrawError || withDrawConError))
                            ? "empty-field"
                            : ""
                        }  `}
                        value={a.name === "Add Money" ? addMoney : withDraw}
                        type="number"
                        max={25}
                        handleChange={(e) => {
                          this.handleInput(
                            a.name === "Add Money" ? "addMoney" : "withDraw",
                            e.target.value
                          );
                        }}
                      />
                      <Button
                        className="btn-head"
                        onClick={() => this.handleSubmit(a.name)}
                      >
                        {a.name === "Add Money" ? WalletConst.add : a.name}
                      </Button>
                    </>
                  )}
                </div>
                {i === 1 && addMoneyConError && (
                  <div className="form-error">{WalletConst.maxValue}</div>
                )}
                {i === 2 && withDrawConError && (
                  <div className="form-error">{WalletConst.maxValue}</div>
                )}
              </div>
            </div>
          </div>
        </Col>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  inputNumberUi = () => {
    try {
      return (
        <>
          <span>{WalletConst.show}</span>
          <InputNumber min={1} max={100000} onChange={this.onChange} />
          <span className="entries">{WalletConst.entries}</span>
        </>
      );
    } catch (error) {
      console.log(error);
    }
  };
  SearchUI = () => {
    try {
      return (
        <Input
          placeholder={WalletConst.search}
          suffix={<SearchOutlined />}
          onChange={this.searchChange}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { trHistory, loading, currBal } = this.props;
    const { dataLength, currentPage } = this.state;
    let start =
      dataLength === 0
        ? 0
        : currentPage > 1
        ? (currentPage - 1) * 10 + 1
        : currentPage;
    let to =
      currentPage > 1
        ? 10 * (currentPage - 1) + trHistory.length
        : trHistory.length;
    let msg = `Showing ${start} to ${to} of ${dataLength} entries`;
    let name = currBal[0]?.partnerName
      ? currBal[0]?.partnerName + WalletConst.wallet
      : "";
    return (
      <Spin spinning={loading} size="large">
        <WalletStyle>
          <Menu />
          <div className="container">
            <Header title={"Wallet"} />
            <div className="allDiv anime">
              <h2 className="hrob">{name} </h2>
              <Row gutter={30}>{this.topRowUi()}</Row>
              <div className="boxDiv">
                <h2 className="hrob">{WalletConst.tranHistory}</h2>
                <div className="inputNum-div">
                  {/* <div className="inputDiv"> {this.inputNumberUi()} </div> */}
                  {trHistory?.length > 0 && (
                    <div className="searchDiv">{this.SearchUI()}</div>
                  )}
                </div>
                <div className="table-div">
                  <Table
                    data={trHistory}
                    type="wallet"
                    size={10}
                    current={currentPage}
                  />
                </div>
                <div className="bottomDiv">
                  <p className="last-para">{msg}</p>
                  {dataLength > 10 && (
                    <div className="paginDiv">
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
        </WalletStyle>
      </Spin>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.wallet.loading,
  trHistory: state.wallet.trHistory,
  currBal: state.wallet.currBal,
});
const mapDispatchToProps = (dispatch) => ({
  getTaransactionHistory: (payload) =>
    dispatch(getTaransactionHistory(payload)),
  getCurrentBalance: (payload) => dispatch(getCurrentBalance(payload)),
  addWithdarawMoney: (payload) => dispatch(addWithdarawMoney(payload)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wallet));
