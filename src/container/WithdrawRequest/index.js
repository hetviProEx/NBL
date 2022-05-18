import React, { Component } from "react";
import { Spin, Image } from "antd";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  SearchOutlined,
  CloseOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { RequestStyle } from "./style";
import { RequestConst } from "./constatnt";
import { ButtonConst } from "App/AppConstant";
import { configVar } from "modules/config";
import {
  Menu,
  Header,
  Input,
  Pagination,
  Table,
  FormDrawer,
  Label,
  FileUpload,
  Button,
  CommentModel,
} from "components/Form";
import { getWithdrawRequest, saveWithdrawRequest } from "redux/wallet/action";

class WithdrawRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      current: 0,
      status: 0,
      widrwAmount: 0,
      withdrawalid: 0,
      visible: false,
      acceptAmoErr: false,
      accMoreError: false,
      btnDisable: false,
      fileError: false,
      remError: false,
      comment: "",
      acceptAmo: "",
      imgName: "",
      imgByte: "",
      imgBase64: "",
      remarks: "",
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
      //   const {userId} =this.props;
      //   paramet.parameter= userId.toString();
      await this.props.getWithdrawRequest(paramet);
    } catch (error) {
      console.log(error);
    }
  }
  handlePagination = async (val) => {
    try {
      const { paramet } = this.state;
      paramet.page = val.toString();
      await this.props.getWithdrawRequest(paramet);
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
      await this.props.getWithdrawRequest(paramet);
    } catch (error) {
      console.log(error);
    }
  };
  toggleDrawer = (val, id, status, withdarwalAmount) => {
    try {
      const { visible } = this.state;
      this.setState({
        visible: !visible,
        withdrawalid: id ? id : 0,
        status: status,
        widrwAmount: withdarwalAmount,
      });
      if (val) this.setDefault();
    } catch (error) {
      console.log(error);
    }
  };

  downloadFile = (url) => {
    try {
      // let txt = url.replace(/\\/g, "%5C");
      let downURL = configVar.BASE_URL.slice("/", -1) + url;
      var win = window.open(downURL, "_blank");
      win.focus();
    } catch (error) {
      console.log(error);
    }
  };
  showComment = (val) => {
    try {
      const { show } = this.state;
      this.setState({ show: !show, comment: val ? val : "" })
    } catch (error) {
      console.log(error);
    }
  }
  fileUpload = () => {
    try {
      const { imgByte, imgName, fileError } = this.state;
      if (imgByte !== "") {
        let splName = imgName?.split(".");
        return (
          <span className="optionui anime">
            {splName[splName.length - 1] === "pdf" ? (
              <span className="txtWrap">{imgName}</span>
            ) : (
              <Image src={imgByte} width={50} height={30} />
            )}
            <CloseOutlined onClick={() => this.removefile()} />
          </span>
        );
      } else {
        return (
          <FileUpload
            accept={".pdf,.jpg,.jpeg, .png,.svg"}
            image={true}
            sendByte={this.setUpload}
            className={`fileUpl ${fileError ? "empty" : ""}`}
            elements={<UploadOutlined />}
          />
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  setUpload = (byteCode, name, base64) =>
    this.setState({
      imgByte: byteCode,
      imgName: name,
      imgBase64: base64,
      fileError: false,
    });
  removefile = () =>
    this.setState({ imgByte: "", imgName: "", imgBase64: "", fileError: true });
  setDefault = () => {
    try {
      this.setState({
        acceptAmoErr: false,
        accMoreError: false,
        fileError: false,
        remError: false,
        acceptAmo: "",
        imgName: "",
        imgByte: "",
        imgBase64: "",
        remarks: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleAmount = (e) => {
    try {
      const { widrwAmount } = this.state;
      this.setState({
        acceptAmo: e.target.value.trim(),
        acceptAmoErr: e.target.value.trim() !== "" ? false : true,
        accMoreError:
          parseFloat(e.target.value.trim()) <= widrwAmount &&
            e.target.value.trim() !== ""
            ? false
            : true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleRemarks = (e) => {
    try {
      this.setState({
        remarks: e.target.value,
        remError: e.target.value.trim() !== "" ? false : true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = async () => {
    try {
      const {
        accMoreError,
        acceptAmoErr,
        status,
        imgBase64,
        acceptAmo,
        remarks,
        withdrawalid,
        widrwAmount,
        paramet,
      } = this.state;
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      let flag = false;
      if (status === 1 && acceptAmo.trim() === "") {
        flag = true;
        this.setState({ acceptAmoErr: true });
      }
      if (status === 1 && (accMoreError || acceptAmoErr)) {
        flag = true;
      }
      if (status === 1 && imgBase64.trim() === "") {
        flag = true;
        this.setState({ fileError: true });
      }
      if (status === 2 && remarks.trim() === "") {
        flag = true;
        this.setState({ remError: true });
      }
      if (!flag) {
        let sendData = {
          wdId: 0,
          withdarwalAmount: acceptAmo !== "" ? parseFloat(acceptAmo) : 0,
          uploadProof: imgBase64,
          remarks: status === 1 ? "" : remarks.trim(),
          withdrawalid: withdrawalid,
          status:
            status === 2 ? 2 : parseFloat(acceptAmo) < widrwAmount ? 3 : 1,
        };
        await this.props.saveWithdrawRequest(sendData);
        await this.props.getWithdrawRequest(paramet);
        this.toggleDrawer(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const {
      current,
      visible,
      status,
      widrwAmount,
      acceptAmo,
      acceptAmoErr,
      accMoreError,
      fileError,
      btnDisable,
      remarks,
      remError,
      show,
      comment,
    } = this.state;
    const { withdrawRequests, loading } = this.props;
    let requestLength =
      withdrawRequests?.length > 0 ? withdrawRequests[0].totalLenght : 0;
    return (
      <Spin spinning={loading} size="large">
        <RequestStyle id={"form-Darwer"}>
          <Menu />
          <div className="container">
            <Header title={"Withdraw-Request"} />
            <div className="allDiv anime">
              {visible && (
                <FormDrawer
                  title={
                    <div className="headDiv">
                      <h3 className="hrob">
                        {status === 1 ? "Approve" : "Reject"}
                      </h3>
                    </div>
                  }
                  visible={visible}
                  onClose={() => this.toggleDrawer(true)}
                >
                  <div className="formDiv anime">
                    {status === 1 && (
                      <div className="field">
                        {status === 1 && (
                          <Label title={RequestConst.reqAmo + widrwAmount} />
                        )}
                        <Label
                          title={RequestConst.acceptAmou}
                          className={
                            acceptAmoErr || accMoreError ? "empty" : ""
                          }
                        />
                        <Input
                          value={acceptAmo}
                          // placeholder={WalletConst.withDra}
                          className={
                            acceptAmoErr || accMoreError ? "empty" : ""
                          }
                          type="number"
                          onChange={this.handleAmount}
                        />
                        <Label
                          title={RequestConst.uplProof}
                          className={fileError ? "empty" : ""}
                        />
                        {this.fileUpload()}
                      </div>
                    )}
                    {status === 2 && (
                      <div className="field">
                        <Label
                          title={RequestConst.remark}
                          className={remError ? "empty" : ""}
                        />
                        <Input
                          row={3}
                          value={remarks}
                          handleChange={this.handleRemarks}
                          className={remError ? "empty" : ""}
                        />
                      </div>
                    )}
                    <div className="btnDiv">
                      <Button disabled={btnDisable} onClick={this.handleSubmit}>
                        {ButtonConst.submit}
                      </Button>
                    </div>
                  </div>
                </FormDrawer>
              )}
              <div className="covDiv">
                <div className="headDIV anime">
                  <h2 className="hrob">{RequestConst.request}</h2>
                </div>
                <div className="contDIV">
                  <div className="contHead anime">
                    <div className="srchDiv">
                      <Input
                        placeholder={ButtonConst.search}
                        suffix={<SearchOutlined />}
                        onChange={this.searchChange}
                      />
                    </div>
                  </div>
                  <div className="tableDIV">
                    <Table
                      current={current}
                      data={withdrawRequests}
                      type={"request"}
                      approv={this.toggleDrawer}
                      download={this.downloadFile}
                      commentRecord={this.showComment}
                    />
                    {requestLength > 10 && (
                      <div className="pagiDiv">
                        <Pagination
                          onChange={this.handlePagination}
                          current={current}
                          total={requestLength}
                          pageSize={10}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {show && (
              <CommentModel
                remarek={comment}
                visible={show}
                onOk={this.showComment}
                onCancel={this.showComment}
              />
            )}
          </div>
        </RequestStyle>
      </Spin>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.wallet.loading,
  withdrawRequests: state.wallet.withdrawRequests,
});
const mapDispatchToProps = (dispatch) => ({
  getWithdrawRequest: (payload) => dispatch(getWithdrawRequest(payload)),
  saveWithdrawRequest: (payload) => dispatch(saveWithdrawRequest(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WithdrawRequest)
);
