import React, { Component } from "react";
import { Input, Label, Button } from "components/Form";
import { Row, Col } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FinancialConst } from "../constant";
import { ButtonConst, FormValidation } from "App/AppConstant";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { savePartner, getPartnerById } from "redux/partner/action";

const UserValidation = Yup.object().shape({
  bankName: Yup.string()
    .trim()
    .required(" ")
    .matches(/^[aA-zZ\s]+$/, FormValidation.alphaValid),
  branchName: Yup.string()
    .trim()
    .required(" ")
    .matches(/^[aA-zZ\s]+$/, ""),
  accountNumber: Yup.string().trim().min(11).max(11).required(" "),
  ifsc: Yup.string()
    .trim()
    .required(" ")
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "only"),
  address: Yup.string().trim().required(" "),
  pincode: Yup.string().trim().required(" ").min(6).max(6),
  city: Yup.string().trim().required(" "),
  state: Yup.string().trim().required(" "),
});
class FinancialDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      initVal: {
        bankName: "",
        branchName: "",
        address: "",
        accountNumber: "",
        ifsc: "",
        pincode: "",
        state: "",
        city: "",
      },
    };
  }
  componentDidMount() {
    try {
      const { partData } = this.props;
      if (partData.partnerId || partData.partnerId === 0)
        this.setInit(partData);
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { partData } = this.props;
      if (partData !== prevProps.partData) {
        this.setInit(partData);
      }
    } catch (error) {
      console.log(error);
    }
  }
  setInit = (a) => {
    try {
      let data = {
        bankName: a.bankName,
        branchName: a.branchName,
        address: a.bankAddress,
        accountNumber: a.accountNumber,
        ifsc: a.ifsc,
        pincode: a.bankPincode,
        state: a.bankState,
        city: a.bankCity,
      };
      this.setState({ initVal: data });
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = async (val, { setSubmitting }) => {
    try {
      const { partData, userId } = this.props;
      this.setState({ disable: true });
      setTimeout(() => {
        this.setState({ disable: false });
      }, 4500);
      let data = partData;
      data.bankName = val.bankName;
      data.branchName = val.branchName;
      data.bankAddress = val.address;
      data.accountNumber = val.accountNumber.toString();
      data.ifsc = val.ifsc;
      data.bankPincode = val.pincode.toString();
      data.bankState = val.state;
      data.bankCity = val.city;
      await this.props.savePartner(data);
      await this.props.getPartnerById(userId);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { disable, initVal } = this.state;
    return (
      <div>
        <Formik
          initialValues={initVal}
          validationSchema={UserValidation}
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
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={FinancialConst.bank_name}
                    className={
                      errors.bankName && touched.bankName ? "empty" : ""
                    }
                  />
                  <Input
                    onBlur={handleBlur}
                    name="bankName"
                    value={values.bankName}
                    handleChange={handleChange}
                    tabIndex="1"
                    className={
                      errors.bankName && touched.bankName ? "empty" : ""
                    }
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={FinancialConst.branch_name}
                    className={
                      errors.branchName && touched.branchName ? "empty" : ""
                    }
                  />
                  <Input
                    className={
                      errors.branchName && touched.branchName ? "empty" : ""
                    }
                    onBlur={handleBlur}
                    name="branchName"
                    value={values.branchName}
                    handleChange={handleChange}
                    tabIndex="2"
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={FinancialConst.account_no}
                    className={
                      errors.accountNumber && touched.accountNumber
                        ? "empty"
                        : ""
                    }
                  />
                  <Input
                    type="number"
                    className={
                      errors.accountNumber && touched.accountNumber
                        ? "empty"
                        : ""
                    }
                    onBlur={handleBlur}
                    name="accountNumber"
                    value={values.accountNumber}
                    handleChange={handleChange}
                    tabIndex="3"
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={FinancialConst.ifsc}
                    className={errors.ifsc && touched.ifsc ? "empty" : ""}
                  />
                  <Input
                    className={errors.ifsc && touched.ifsc ? "empty" : ""}
                    onBlur={handleBlur}
                    name="ifsc"
                    value={values.ifsc}
                    handleChange={handleChange}
                    tabIndex="4"
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={FinancialConst.address}
                    className={errors.address && touched.address ? "empty" : ""}
                  />
                  <Input
                    rows={2}
                    className={errors.address && touched.address ? "empty" : ""}
                    onBlur={handleBlur}
                    name="address"
                    handleChange={handleChange}
                    value={values.address}
                    tabIndex="5"
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={FinancialConst.pincode}
                    className={errors.pincode && touched.pincode ? "empty" : ""}
                  />
                  <Input
                    className={errors.pincode && touched.pincode ? "empty" : ""}
                    onBlur={handleBlur}
                    name="pincode"
                    type="number"
                    value={values.pincode}
                    handleChange={handleChange}
                    tabIndex="6"
                  />
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={8}
                  xl={8}
                  className="anime highZ2"
                >
                  <Label
                    title={FinancialConst.state}
                    className={errors.state && touched.state ? "empty" : ""}
                  />
                  <Input
                    onBlur={handleBlur}
                    name="state"
                    value={values.state}
                    handleChange={handleChange}
                    tabIndex="8"
                    className={errors.state && touched.state ? "empty" : ""}
                  />
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={8}
                  xl={8}
                  className="anime highZ"
                >
                  <Label
                    title={FinancialConst.city}
                    className={errors.city && touched.city ? "empty" : ""}
                  />
                  <Input
                    onBlur={handleBlur}
                    name="city"
                    value={values.city}
                    handleChange={handleChange}
                    tabIndex="7"
                    className={errors.city && touched.city ? "empty" : ""}
                  />
                </Col>
              </Row>
              <div className="btnDiv anime">
                <Button type="submit" disabled={disable}>
                  {ButtonConst.update}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getPartnerById: (userId) => dispatch(getPartnerById(userId)),
  savePartner: (payload) => dispatch(savePartner(payload)),
});
export default withRouter(connect(null, mapDispatchToProps)(FinancialDetails));
