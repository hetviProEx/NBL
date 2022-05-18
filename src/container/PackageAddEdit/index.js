import React, { Component } from "react";
import { Row, Col, Spin } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { PackStyle } from "./style";
import { ButtonConst, ComConst } from "App/AppConstant";
import { packConst } from "./constant";
import {
  Menu,
  Header,
  Input,
  Label,
  Select,
  Button,
  RichTextBox,
  AutoComplete,
} from "components/Form";
import {
  getSubscribePackage,
  saveProductPackage,
  getProductPackage,
  getPackageById,
} from "redux/subscribe/action";
import { getAuthUserID } from "modules/helper";
var userId = getAuthUserID();
const PackageValidation = Yup.object().shape({
  packageType: Yup.string().trim().required(" "),
});
class PackageAddEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisable: false,
      selectData: [],
      productId: 0,
      item: "",
      monthError: false,
      annuError: false,
      initialState: {
        packageId: 0,
        packageType: "",
        monthlyPrice: "",
        annualPrice: "",
        saveOther: false,
        packageDetails: "",
      },
    };
  }
  async componentDidMount() {
    try {
      const { match } = this.props;
      userId = userId ? userId : getAuthUserID();
      await this.props.getSubscribePackage();
      if (match.params.editid) {
        let editId = window.atob(match.params.editid);
        await this.props.getProductPackage(editId);
      }
      if (match.params.id) {
        let id = window.atob(match.params.id); // await this.props.getPackageById(id);// await this.props.getSubscribePackage();
        this.setState({ productId: id, item: match.params.name });
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { packageSelect, packageDetail } = this.props;
      // const { selectData } = this.state;
      if (packageSelect !== prevProps.packageSelect) {
        let tSelect = [];
        packageSelect?.forEach((a) => {
          tSelect.push({ value: a.text });
        });
        this.setState({ selectData: tSelect });
      }
      if (packageDetail !== prevProps.packageDetail) {
        let data = packageDetail && packageDetail[0];
        let editData = {
          packageId: data.packageId,
          packageType: data.packageType,
          monthlyPrice: data.monthlyPackage.toString(),
          annualPrice: data.annualPackage.toString(),
          packageDetails: data.packageDescription,
        };
        this.setState({ initialState: editData });
      }
    } catch (error) {
      console.log(error);
    }
  }
  selectUI = (val, setFieldValue, error) => {
    try {
      const { selectData } = this.state;
      return (
        <Select
          data={selectData}
          withID={true}
          value={val}
          defaultValue={val}
          selectClass={error ? "empty" : ""}
          onChange={(value, data) => {
            setFieldValue("packageType", value);
            setFieldValue("packageTypeId", data.id);
          }}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const { productId, item } = this.state;
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      let flag = false;
      if (
        (values.monthlyPrice === "" && values.annualPrice === "") ||
        (values.monthlyPrice === "0" && values.annualPrice === "0")
      ) {
        flag = true;
        this.setState({ monthError: true, annuError: true });
      }
      if (flag === false) {
        let sendData = {
          packageId: values.packageId,
          productId: parseInt(productId),
          packageType: values.packageType,
          monthlyPackage:
            values.monthlyPrice !== "" ? parseInt(values.monthlyPrice) : 0,
          annualPackage:
            values.annualPrice !== "" ? parseInt(values.annualPrice) : 0,
          packageDescription: values.packageDetails,
          createdBy: userId,
        };
        let rediPath = item + "/" + window.btoa(productId);
        await this.props.saveProductPackage({
          data: sendData,
          url: rediPath,
          saveOther: values.saveOther,
        });
        if (values.saveOther) {
          resetForm();
          window.location.reload();
        }
      }
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  handlePrice = (val, name, setFieldValue) => {
    try {
      setFieldValue(name, val.target.value);
      this.setState({
        monthError: val.target.value === "",
        annuError: val.target.value === "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const {
      initialState,
      productId,
      item,
      btnDisable,
      annuError,
      monthError,
      selectData,
    } = this.state;
    const { loading } = this.props;
    return (
      <Spin spinning={loading} size="large">
        <PackStyle>
          <Menu />
          <div className="container">
            <Header title={"Package"} />
            <div className="allDiv anime">
              <div className="headDiv">
                <h2 className="hrob">
                  {initialState.packageId === 0
                    ? packConst.addNewPack
                    : packConst.editPack}
                </h2>
                <div
                  className="addButton pointer"
                  onClick={() =>
                    this.props.history.push(
                      `/package-list/${item}/${window.btoa(productId)}`
                    )
                  }
                >
                  <ArrowLeftOutlined />
                </div>
              </div>
              <div className="formDiv">
                <Formik
                  initialValues={initialState}
                  validationSchema={PackageValidation}
                  onSubmit={this.handleSubmit}
                  enableReinitialize
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                          <div className="field">
                            <Label
                              title={packConst.packType + ComConst.colon}
                              className={
                                errors.packageType &&
                                touched.packageType &&
                                values.packageType === ""
                                  ? "empty"
                                  : ""
                              }
                            />
                            <AutoComplete
                              onBlur={handleBlur}
                              name="packageType"
                              value={values.packageType}
                              handleChange={(val) =>
                                setFieldValue("packageType", val)
                              }
                              selectData={selectData}
                              className={
                                errors.packageType && touched.packageType
                                  ? "autoempty"
                                  : ""
                              }
                            />
                          </div>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={12} xl={12}></Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                          <div className="field">
                            <Label
                              title={packConst.monthPrice + ComConst.colon}
                              className={monthError ? "empty" : ""}
                            />
                            <Input
                              className={monthError ? "empty" : ""}
                              type="number"
                              onBlur={handleBlur}
                              name="monthlyPrice"
                              value={values.monthlyPrice}
                              handleChange={(val) =>
                                this.handlePrice(
                                  val,
                                  "monthlyPrice",
                                  setFieldValue
                                )
                              }
                            />
                          </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                          <div className="field">
                            <Label
                              title={packConst.annualPrice + ComConst.colon}
                              className={annuError ? "empty" : ""}
                            />
                            <Input
                              className={annuError ? "empty" : ""}
                              type="number"
                              onBlur={handleBlur}
                              name="annualPrice"
                              value={values.annualPrice}
                              handleChange={(val) =>
                                this.handlePrice(
                                  val,
                                  "annualPrice",
                                  setFieldValue
                                )
                              }
                            />
                          </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                          <div className="field">
                            <Label
                              title={packConst.packDetails + ComConst.colon}
                            />
                            <RichTextBox
                              value={values.packageDetails}
                              onBlur={handleBlur}
                              changeTxt={(val) =>
                                setFieldValue("packageDetails", val)
                              }
                              type="Package"
                            />
                          </div>
                        </Col>
                      </Row>
                      <div className="btnDiv">
                        <div className="nextDiv">
                          <Button
                            onClick={() =>
                              this.props.history.push(
                                `/package-list/${item}/${window.btoa(
                                  productId
                                )}`
                              )
                            }
                          >
                            {ButtonConst.cancel}
                          </Button>
                          {values.packageId === 0 && (
                            <Button
                              type="submit"
                              onClick={() => setFieldValue("saveOther", true)}
                              disabled={btnDisable}
                            >
                              {ButtonConst.saveAddOther}
                            </Button>
                          )}
                          <Button
                            type="submit"
                            disabled={btnDisable}
                            onClick={() => setFieldValue("saveOther", false)}
                          >
                            {ButtonConst.save}
                          </Button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </PackStyle>
      </Spin>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.subscribe.loading,
  packages: state.subscribe.packages,
  packageSelect: state.subscribe.packageSelect,
  packageDetail: state.subscribe.packageDetail,
});
const mapDispatchToProps = (dispatch) => ({
  getSubscribePackage: (payload) => dispatch(getSubscribePackage(payload)),
  saveProductPackage: (payload) => dispatch(saveProductPackage(payload)),
  getProductPackage: (payload) => dispatch(getProductPackage(payload)),
  getPackageById: (payload) => dispatch(getPackageById(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PackageAddEdit)
);
