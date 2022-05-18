import React, { Component } from "react";
import * as Yup from "yup";
import { Spin, Image, Empty ,message } from "antd"; //Modal
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
  CloseOutlined,
  PercentageOutlined,
} from "@ant-design/icons";
// QuestionCircleOutlined,

import { CommissionStyle } from "./style";
import { CommissionConst, sendPartner } from "./constant";
import { ButtonConst } from "App/AppConstant"; //RemoveConst
import { getAuthUserID } from "modules/helper";
import {
  Menu,
  Header,
  Label,
  Input,
  Select,
  Button,
  FormDrawer,
  Table,
  ViewModal,
  Pagination,
  FileUpload,
  RoundSwitch,
} from "components/Form";
import {
  saveCommission,
  deleteCommission,
  getCommissionManage,
  saveCommissionManage,
  getCommissionById,
} from "redux/commission/action";

// const { confirm } = Modal;
var userId = getAuthUserID();
const ValidationSchema = Yup.object().shape({
  // partner: Yup.string().trim().required(" "),
  // product: Yup.string().trim().required(" "),
});

class CommissionCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      btnDisable: false,
      visible: false,
      show: false,
      viewData: {},
      imgName: "",
      imgByte: "",
      imgBase64: "",
      comType: true,
      totalCom: "",
      saleId: 0,
      approved: true,
      totalAmount: 0,
      amountError: false,
      percenError: false,
      paramet: {
        parameter: "",
        pageSize: "10",
        page: "1",
        sortColumn: "id",
        search: "",
      },
      initValues: {
        commiID: 0,
        amount: "",
        remarks: "",
      },
    };
  }
  async componentDidMount() {
    try {
      const { paramet } = this.state;
      await this.props.getCommissionManage(paramet);
      userId = userId ? userId : getAuthUserID();
    } catch (error) {
      console.log(error);
    }
  }
  async componentDidUpdate(prevProps) {
    try {
      const { commissionView } = this.props;
      if (commissionView !== prevProps.commissionView) {
        this.setState({ viewData: commissionView });
      }
    } catch (error) {
      console.log(error);
    }
  }
  searchChange = async (e) => {
    try {
      let parameter = this.state.paramet;
      parameter.search = e.target.value.trim();
      parameter.page = "1";
      this.setState({ current: 1 });
      await this.props.getCommissionManage(parameter);
    } catch (error) {
      console.log(error);
    }
  };
  handlePagination = async (val) => {
    let parameter = this.state.paramet;
    parameter.page = val.toString();
    await this.props.getCommissionManage(parameter);
    this.setState({ current: val });
  };
  viewRecord = async (id) => {
    try {
      const { show } = this.state;
      await this.props.getCommissionById(id);
      this.setState({ show: !show });
    } catch (error) {
      console.log(error);
    }
  };
  fileUpload = () => {
    try {
      const { imgByte, imgName } = this.state;
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
            className={"fileUpl"}
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
    });
  removefile = () => this.setState({ imgByte: "", imgName: "", imgBase64: "" });
  toggleDrawer = (val, id, approv, totalAmount) => {
    try {
      const { visible } = this.state;
      this.setState({
        visible: !visible,
        saleId: id ? id : 0,
        approved: approv,
        totalAmount: totalAmount,
      });
      if (val) this.setDefault();
    } catch (error) {
      console.log(error);
    }
  };
  setDefault = () => {
    try {
      let initValues = {
        commiID: 0,
        amount: "",
        remarks: "",
      };
      this.setState({
        initValues,
        ComType: true,
        totalCom: "",
        imgName: "",
        imgByte: "",
        imgBase64: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleSwitch = (setFieldValue) => {
    try {
      const { comType } = this.state;
      setFieldValue("amount", "");
      this.setState({
        comType: !comType,
        totalCom: "",
        amountError: false,
        percenError: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleAmount = (e, setFieldValue) => {
    try {
      const { comType, totalAmount } = this.state;
      let val = e.target.value.trim();
      setFieldValue("amount", val);
      if (comType && parseInt(val) <= 100) {
        let tcom = (val / 100) * totalAmount;
        this.setState({
          totalCom: val !== "" ? tcom.toString() : "",
          amountError: val !== "" ? false : true,
          percenError: false,
        });
      } else if (comType) {
        this.setState({
          percenError: comType && val !== "" ? true : false,
          totalCom: "",
          amountError: parseInt(val) <= 100 ? false : true,
        });
      } else if (!comType) {
        this.setState({
          totalCom: val,
          amountError: val !== "" ? false : true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const {
        paramet,
        saleId,
        approved,
        comType,
        totalCom,
        imgBase64,
        percenError,
        totalAmount,
      } = this.state;
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      let flag = false;
      if (approved && values.amount.trim() === "") {
        flag = true;
        this.setState({ amountError: true });
      }
      if (percenError) {
        flag = true;
      }
      if(!comType && totalAmount<totalCom){
        flag = true;
        message.error("Can't Be Added Greter Then Total Amount.");
      }
      if (!flag) {
        let sendData = {
          commissionid: values.commiID,
          saleId: saleId,
          approved: approved,
          commissiontype: comType,
          commissionvalue: parseInt(values.amount),
          uploadproof: imgBase64 !== "" ? imgBase64 : "",
          totalCommission: totalCom ? parseInt(totalCom) : 0,
          remarks: values.remarks,
          createdBy: userId,
        };
        await this.props.saveCommissionManage(sendData);
        await this.props.getCommissionManage(paramet);
        resetForm();
        this.toggleDrawer(true);
      }
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const {
      initValues,
      visible,
      btnDisable,
      current,
      show,
      viewData,
      comType,
      totalCom,
      approved,
      amountError,
      percenError,
    } = this.state;
    const { loading, commissionList } = this.props;
    let commissionLength =
      commissionList?.length > 0 ? commissionList[0].totalLenght : 0;
    return (
      <Spin spinning={loading} size="large">
        <CommissionStyle id="commission-form">
          <Menu />
          <div className="container">
            <Header title={"Commission"} />
            <div className="allDiv">
              <div className="coMainDiv" id={"form-Darwer"}>
                {visible && (
                  <Formik
                    initialValues={initValues}
                    validationSchema={ValidationSchema}
                    onSubmit={this.handleSubmit}
                    enableReinitialize
                  >
                    {({
                      values,
                      errors,
                      touched,
                      onBlur,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      setFieldValue,
                    }) => (
                      <FormDrawer
                        title={
                          <div className="headDiv">
                            <h3 className="hrob">{CommissionConst.addNew}</h3>
                          </div>
                        }
                        visible={visible}
                        onClose={() => this.toggleDrawer(true)}
                      >
                        <Form onSubmit={handleSubmit} className="formDiv anime">
                          {approved ? (
                            <div className="field">
                              <Label title={CommissionConst.commiType} />
                              <RoundSwitch
                                left="₹"
                                right="%"
                                checked={comType}
                                handleChange={() =>
                                  this.handleSwitch(setFieldValue)
                                }
                              />

                              <Label
                                title={
                                  comType
                                    ? CommissionConst.percentage
                                    : CommissionConst.amount
                                }
                                className={amountError ? "empty" : ""}
                              />
                              <Input
                                className={amountError ? "empty" : ""}
                                min={0}
                                step={0.00}
                                type="number"
                                onBlur={handleBlur}
                                name="amount"
                                value={values.amount}
                                handleChange={(e) =>
                                  this.handleAmount(e, setFieldValue)
                                }
                                suffix={comType ? <PercentageOutlined /> : "₹"}
                              />
                              {percenError ? (
                                <div className="form-error">
                                  {"can't Add More Then 100"}
                                </div>
                              ) : (
                                ""
                              )}
                              {totalCom !== "" && (
                                <>
                                  <Label title={CommissionConst.totalCom} />
                                  {totalCom}
                                </>
                              )}

                              <Label title={CommissionConst.uplPro} />
                              {this.fileUpload()}
                            </div>
                          ) : (
                            <div className="field">
                              <Label title={CommissionConst.remarks} />
                              <Input
                                row={3}
                                onBlur={handleBlur}
                                name="remarks"
                                value={values.remarks}
                                handleChange={handleChange}
                              />
                            </div>
                          )}
                          <div className="btnDiv">
                            <Button type="submit" disabled={btnDisable}>
                              {CommissionConst.submit}
                            </Button>
                          </div>
                        </Form>
                      </FormDrawer>
                    )}
                  </Formik>
                )}
                <div className="covDiv">
                  <div className="headDIV">
                    <h2 className="hrob">{CommissionConst.CommissionCode}</h2>
                  </div>
                  <div className="contDIV">
                    <div className="contHead anime">
                      {commissionList?.length > 0 && (
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
                        current={current}
                        data={commissionList}
                        type={CommissionConst.CommissionCode.toLowerCase()}
                        approv={this.toggleDrawer}
                        viewRecord={this.viewRecord}
                      />
                      {commissionLength > 10 && (
                        <div className="pagiDiv">
                          <Pagination
                            onChange={this.handlePagination}
                            current={current}
                            total={commissionLength}
                            pageSize={10}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {show && (
                <ViewModal
                  data={viewData}
                  title={CommissionConst.CommissionCode}
                  visible={show}
                  onCancel={this.viewRecord}
                  onOk={this.viewRecord}
                />
              )}
            </div>
          </div>
        </CommissionStyle>
      </Spin>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.commission.loading,
  products: state.crm.products,
  partners: state.partner.partners,
  commission: state.commission.commission,
  commissionList: state.commission.commissionList,
  commissionView: state.commission.commissionById,
});
const mapDispatchToProps = (dispatch) => ({
  saveCommission: (payload) => dispatch(saveCommission(payload)),
  deleteCommission: (payload) => dispatch(deleteCommission(payload)),
  getCommissionManage: (payload) => dispatch(getCommissionManage(payload)),
  saveCommissionManage: (payload) => dispatch(saveCommissionManage(payload)),
  getCommissionById: (payload) => dispatch(getCommissionById(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CommissionCode)
);
