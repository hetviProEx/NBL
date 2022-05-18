import React, { Component } from "react";
import { Row, Col, message, Spin, Image } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";

import { SalesAddEditStyle } from "./style";
import {
  Menu,
  Header,
  Card,
  Label,
  Select,
  RoundSwitch,
  Input,
  Button,
  PackageCard,
  DatePicker,
  FileUpload,
} from "components/Form";
import { SalesConst } from "./constant";
import { configVar } from "modules/config";
import { FormValidation, gstConst } from "App/AppConstant";
import {
  getLeadCustomer,
  getProduct,
  getProdSubscript,
  saveSales,
  getSalesById,
} from "redux/crm/action";
import { getAuthUserID } from "modules/helper";

var userId = getAuthUserID();
const ValidationSchema = Yup.object().shape({
  lead: Yup.string().trim().required(" "),
  gstNo: Yup.string().trim().min(15).matches(gstConst, FormValidation.gstvalid),
  product: Yup.string().trim().required(" "),
  timePeriod: Yup.string().trim().required(" "),
});
class SalesAddEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gstType: false,
      subType: false,
      gstError: false,
      btnDisable: false,
      msgDisable: true,
      uploadError: false,
      imgName: "",
      imgByte: "",
      imgBase64: "",
      leadSelect: [],
      productSelect: [],
      timePeriodSelect: [],
      packageId: 0,
      payAmount: 0,
      initValues: {
        salesId: 0,
        lead: "",
        leadId: 0,
        gstNo: "",
        product: "",
        productId: 0,
        timePeriod: "",
        timePeriodId: 0,
        salDate: "",
        traID: "",
      },
    };
  }
  async componentDidMount() {
    try {
      const { match } = this.props;
      userId = userId ? userId : getAuthUserID();
      await this.props.getLeadCustomer(userId);
      await this.props.getProduct();
      if (match.params.id) {
        await this.props.getSalesById(parseInt(window.atob(match.params.id)));
      }
      let data = JSON.parse(localStorage.fromMeeting);
      if (data) {
        this.setdefault(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { leadCustomers, products, productSubscript, sale, match } =
        this.props;
      const { initValues } = this.state;

      if (leadCustomers !== prevProps.leadCustomers) {
        let leadSel = [];
        leadCustomers?.forEach((a) => {
          leadSel.push({ id: parseInt(a.value), value: a.text });
        });
        this.setState({ leadSelect: leadSel });
      }
      if (products !== prevProps.products) {
        let proSel = [];
        products?.forEach((a) => {
          proSel.push({ id: a.productId, value: a.productName });
        });
        this.setState({ productSelect: proSel });
      }
      if (productSubscript !== prevProps.productSubscript) {
        let timePre = [];
        productSubscript?.proTimePeriod?.forEach((a) => {
          timePre.push({ id: a.tId, value: a.timePeriod });
        });
        this.setState({ timePeriodSelect: timePre });
        if (match.params.id) {
          let timepri = timePre.find((x) => x.id === sale.timePeriod);
          initValues.timePeriodId = timepri.id;
          initValues.timePeriod = timepri.value;
          this.setState({ initValues });
        }
      }
      if (sale !== prevProps.sale) {
        this.setEdit(sale);
      }
    } catch (error) {
      console.log(error);
    }
  }
  setEdit = (sale) => {
    try {
      const { leadSelect, productSelect } = this.state;
      let lead = leadSelect.find((x) => x.id === sale.lId);
      let product = productSelect.find((x) => x.id === sale.pId);
      let uplodname = sale.uploadreceipt?.split("/");
      let editData = {
        salesId: sale.sId,
        lead: lead.value,
        leadId: sale.lId,
        gstNo: sale.gst,
        product: product.value,
        productId: sale.pId,
        salDate: sale.salesDate,
        traID: sale.transactionID,
      };
      this.proSubCall(sale.stype, sale.pId);
      this.setState({
        initValues: editData,
        gstType: sale.gtype === 0 ? false : true,
        subType: sale.stype === 0 ? false : true,
        imgName: uplodname[uplodname.length - 1],
        imgByte: configVar.BASE_URL + sale.uploadreceipt,
        imgBase64: sale.uploadreceipt,
        packageId: sale.pcId,
        payAmount: sale.totalamount,
      });
    } catch (error) {
      console.log(error);
    }
  };
  setdefault = (data) => {
    try {
      const { leadSelect, productSelect, initValues, subType } = this.state;
      if (leadSelect.length !== 0 && productSelect.length !== 0 && data) {
        initValues.lead = data.customerName;
        initValues.leadId = data.customerId;
        initValues.product = data.productName;
        initValues.productId = data.productId;
        this.setState({
          initValues: initValues,
        });
        this.proSubCall(subType ? 1 : 0, data.productId);
        localStorage.removeItem("fromMeeting");
      }
    } catch (error) {
      console.log(error);
    }
  };
  selectUI = (val, name, setFieldValue, error) => {
    try {
      const { subType, leadSelect, productSelect, timePeriodSelect } =
        this.state;
      return (
        <Select
          data={
            name === "timePeriod"
              ? timePeriodSelect
              : name === "product"
              ? productSelect
              : leadSelect
          }
          withID={true}
          value={val}
          defaultValue={val}
          selectClass={error && val === "" ? "empty" : ""}
          onChange={(value, data) => {
            setFieldValue(name, value);
            name === "lead" && setFieldValue("leadId", data.id);
            name === "product" && setFieldValue("productId", data.id);
            name === "timePeriod" && setFieldValue("timePeriodId", data.id);
            name === "timePeriod" && this.setState({ packageId: 0 });
            name === "product" && this.proSubCall(subType ? 1 : 0, data.id);
          }}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  proSubCall = async (type, id) => {
    try {
      let url = `${id}/${type}`;
      await this.props.getProdSubscript(url);
    } catch (error) {
      console.log(error);
    }
  };
  switchChange = async (val, id) => {
    try {
      const { gstType, subType } = this.state;
      if (val === "subType") {
        let st = !subType;
        this.proSubCall(st ? 1 : 0, id);
        this.setState({ packageId: 0 });
      }
      this.setState({
        gstType: val === "gstType" ? !gstType : gstType,
        subType: val === "subType" ? !subType : subType,
      });
    } catch (error) {
      console.log(error);
    }
  };
  packageUI = (tiperForPay) => {
    try {
      const { productSubscript } = this.props;
      const { packageId, msgDisable } = this.state;
      return productSubscript?.sales?.map(
        (a, i) =>
          a.price !== 0 && (
            <Col xs={24} sm={24} md={24} lg={8} xl={8} key={i}>
              <div className="package_div">
                <PackageCard
                  data={a}
                  packageSelect={(id, val) =>
                    msgDisable && this.packageSelect(id, val, tiperForPay)
                  }
                  selctPackId={packageId}
                  type={SalesConst.sale}
                />
              </div>
            </Col>
          )
      );
    } catch (error) {
      console.log(error);
    }
  };
  packageSelect = (id, val, tiperForPay) => {
    try {
      const { packageId } = this.state;
      if (tiperForPay !== "") {
        let timePeri = parseInt(tiperForPay?.split(" Month" || " Year")[0]);
        let payAmount = val * timePeri;
        this.setState({
          packageId: packageId !== id ? id : 0,
          payAmount: payAmount,
        });
      } else {
        this.setState({ msgDisable: false });
        setTimeout(() => {
          this.setState({ msgDisable: true });
        }, 3500);
        message.error(SalesConst.plzs + SalesConst.timePeriod);
      }
    } catch (error) {
      console.log(error);
    }
  };
  fileUpload = () => {
    try {
      const { imgByte, imgName, uploadError } = this.state;
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
            className={uploadError ? "empty" : ""}
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
      uploadError: base64 !== "" ? false : true,
    });
  removefile = () =>
    this.setState({
      imgByte: "",
      imgName: "",
      imgBase64: "",
      uploadError: true,
    });
  handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { gstType, subType, packageId, imgBase64, payAmount } = this.state;
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      let flag = false;
      if (gstType && values.gstNo === "") {
        this.setState({ gstError: true });
        flag = true;
      }
      if (packageId === 0) {
        flag = true;
        message.error(SalesConst.plzs + SalesConst.pkg);
      }
      if (imgBase64.trim() === "") {
        flag = true;
        this.setState({ uploadError: true });
        message.error("Please add Receipt");
      }
      if (!flag) {
        let sendData = {
          sId: values.salesId,
          lId: values.leadId,
          pId: values.productId,
          gtype: gstType ? 1 : 0,
          gst: gstType ? values.gstNo : "",
          stype: subType ? 1 : 0,
          timePeriod: values.timePeriodId,
          salesDate: values.salDate,
          uploadreceipt: imgBase64,
          transactionID: values.traID.trim(),
          totalamount: payAmount,
          pcId: packageId,
          uId: userId,
          createdBy: userId,
        };
        await this.props.saveSales(sendData);
      }
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const {
      initValues,
      gstType,
      subType,
      gstError,
      btnDisable,
      payAmount,
      packageId,
      uploadError,
    } = this.state;
    const { loading } = this.props;
    return (
      <Spin spinning={loading} size="large">
        <SalesAddEditStyle>
          <Menu />
          <div className="container">
            <Header title={"Sales"} />
            <div className="allDiv anime">
              <Card
                title={"Add New Sales"}
                content={
                  <>
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
                        setFieldValue,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                      }) => (
                        <Form onSubmit={handleSubmit}>
                          <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                              <div className="field anime highZ">
                                <Label
                                  title={SalesConst.lead}
                                  className={
                                    errors.lead &&
                                    touched.lead &&
                                    values.lead === ""
                                      ? "empty"
                                      : ""
                                  }
                                />
                                {values.lead === "" &&
                                  this.selectUI(
                                    "",
                                    "lead",
                                    setFieldValue,
                                    errors.lead && touched.lead
                                  )}
                                {values.lead !== "" &&
                                  this.selectUI(
                                    values.lead,
                                    "lead",
                                    setFieldValue
                                  )}
                              </div>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                              <div className="field anime">
                                <Label title={SalesConst.gstType} />
                                <div className="switchDiv">
                                  <RoundSwitch
                                    left="Not Registered"
                                    right="Registered"
                                    checked={gstType}
                                    handleChange={() =>
                                      this.switchChange("gstType", 0)
                                    }
                                  />
                                </div>
                              </div>
                            </Col>
                            {gstType && (
                              <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                <div className="field anime">
                                  <Label
                                    title={SalesConst.gstno}
                                    className={
                                      (errors.gstNo && touched.gstNo) ||
                                      (gstError && values.gstNo === "")
                                        ? "empty"
                                        : ""
                                    }
                                  />
                                  <Input
                                    className={
                                      (errors.gstNo && touched.gstNo) ||
                                      (gstError && values.gstNo === "")
                                        ? "empty"
                                        : ""
                                    }
                                    onBlur={handleBlur}
                                    max={15}
                                    name="gstNo"
                                    value={values.gstNo}
                                    handleChange={handleChange}
                                  />
                                  {errors.gstNo && touched.gstNo && (
                                    <div className="form-error">
                                      {errors.gstNo}
                                    </div>
                                  )}
                                </div>
                              </Col>
                            )}
                            <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                              <div className="field anime">
                                <Label
                                  title={SalesConst.product}
                                  className={
                                    errors.product &&
                                    touched.product &&
                                    values.product === ""
                                      ? "empty"
                                      : ""
                                  }
                                />
                                {values.product === "" &&
                                  this.selectUI(
                                    "",
                                    "product",
                                    setFieldValue,
                                    errors.product && touched.product
                                  )}
                                {values.product !== "" &&
                                  this.selectUI(
                                    values.product,
                                    "product",
                                    setFieldValue
                                  )}
                              </div>
                            </Col>
                            {values.product !== "" && (
                              <>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                  <div className="field anime">
                                    <Label title={SalesConst.subType} />
                                    <div className="switchDiv">
                                      <RoundSwitch
                                        left="MONTHLY"
                                        right="ANNUAL"
                                        checked={subType}
                                        handleChange={() => {
                                          this.switchChange(
                                            "subType",
                                            values.productId
                                          );
                                          setFieldValue("timePeriod", "");
                                          setFieldValue("timePeriodId", 0);
                                        }}
                                      />
                                    </div>
                                  </div>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                  <div className="field anime">
                                    <Label
                                      title={SalesConst.timePeriod}
                                      className={
                                        errors.timePeriod &&
                                        touched.timePeriod &&
                                        values.timePeriod === ""
                                          ? "empty"
                                          : ""
                                      }
                                    />
                                    {values.timePeriod === "" &&
                                      this.selectUI(
                                        "",
                                        "timePeriod",
                                        setFieldValue,
                                        errors.timePeriod && touched.timePeriod
                                      )}
                                    {values.timePeriod !== "" &&
                                      this.selectUI(
                                        values.timePeriod,
                                        "timePeriod",
                                        setFieldValue
                                      )}
                                  </div>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                  <div className="field anime">
                                    <Label
                                      title={SalesConst.uplRec}
                                      className={uploadError ? "empty" : ""}
                                    />
                                    {this.fileUpload()}
                                  </div>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                  <div className="field">
                                    <Label title={SalesConst.salDate} />
                                    <DatePicker
                                      disableDate={true}
                                      disNext
                                      name="salDate"
                                      value={values.salDate}
                                      onBlur={handleBlur}
                                      handleChange={(data) =>
                                        setFieldValue("salDate", data)
                                      }
                                    />
                                  </div>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                  <div className="field anime">
                                    <Label title={SalesConst.traID} />
                                    <Input
                                      name="traID"
                                      value={values.traID}
                                      handleChange={handleChange}
                                    />
                                  </div>
                                </Col>

                                {!gstType && (
                                  <Col xs={0} sm={0} md={0} lg={0} xl={8}></Col>
                                )}
                                {this.packageUI(values.timePeriod)}
                              </>
                            )}
                          </Row>
                          {packageId !== 0 && (
                            <div className="paymentDiv anime">
                              <div className="payConDiv">
                                <h3>{SalesConst.payamt}</h3>
                                <h2>
                                  <i className="fas fa-rupee-sign"></i>
                                  {payAmount}
                                </h2>
                              </div>
                            </div>
                          )}
                          <div className="btnDiv">
                            <div className="nextDiv">
                              <Button
                                onClick={() =>
                                  this.props.history.push("/sales")
                                }
                              >
                                {SalesConst.cancel}
                              </Button>
                              {packageId !== 0 && (
                                <Button type="submit" disabled={btnDisable}>
                                  {SalesConst.addSubscrib}
                                </Button>
                              )}
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </>
                }
              />
            </div>
          </div>
        </SalesAddEditStyle>
      </Spin>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.crm.loading,
  products: state.crm.products,
  leadCustomers: state.crm.leadCustomers,
  productSubscript: state.crm.productSubscript,
  sale: state.crm.sale,
});
const mapDispatchToProps = (dispatch) => ({
  getLeadCustomer: (payload) => dispatch(getLeadCustomer(payload)),
  getProduct: (payload) => dispatch(getProduct(payload)),
  getProdSubscript: (payload) => dispatch(getProdSubscript(payload)),
  saveSales: (payload) => dispatch(saveSales(payload)),
  getSalesById: (payload) => dispatch(getSalesById(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SalesAddEdit)
);
