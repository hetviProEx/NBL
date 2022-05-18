import React, { Component } from "react";
import * as Yup from "yup";
import { Row, Col } from "antd";
import { Formik, Form } from "formik";
import { withRouter } from "react-router-dom";
import { finConst } from "container/PartnerAddEdit/constant";
import { ButtonConst, FormValidation } from "App/AppConstant";
import { Input, Label, Button } from "components/Form";

const UserValidation = Yup.object().shape({
  bankName: Yup.string()
    .trim()
    .required(" ")
    .matches(/^[aA-zZ\s]+$/, FormValidation.alphaValid),
  branchName: Yup.string()
    .trim()
    .required(" ")
    .matches(/^[aA-zZ\s]+$/, FormValidation.alphaValid),
  accountNo: Yup.string().trim().min(9).max(18).required(" "),
  ifsc: Yup.string()
    .trim()
    .required(" ")
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "only ifsc code allow"),
});
class FinancialDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      pinError: false,
      initVal: {
        bankName: "",
        branchName: "",
        address: "",
        accountNo: "",
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
        bankName: a.bankName ?a.bankName:"",
        branchName: a.branchName?a.branchName:"",
        address: a.bankAddress ? a.bankAddress : "",
        accountNo: a.accountNumber?a.accountNumber:"",
        ifsc: a.ifsc?a.ifsc:"",
        pincode: a.bankPincode ? a.bankPincode : "",
        state: a.bankState ? a.bankState : "",
        city: a.bankCity ? a.bankState : "",
      };
      this.setState({ initVal: data });
    } catch (error) {
      console.log(error);
    }
  };
  handlePin = (val, setFieldValue) => {
    try {
      setFieldValue("pincode", val.trim());
      this.setState({
        pinError: val.trim().length === 6 || val.trim() === "" ? false : true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = async (val, { setSubmitting }) => {
    try {
      const { partData } = this.props;
      this.setState({ disable: true });
      setTimeout(() => {
        this.setState({ disable: false });
      }, 4500);
      let flag = false;
      if (val.pincode.toString() !== "" && val.pincode.length !== 6) {
        flag = true;
        this.setState({ pinError: true });
      }
      if (!flag) {
        let data = partData;
        data.bankName = val.bankName.trim();
        data.branchName = val.branchName.trim();
        data.bankAddress = val.address.trim();
        data.accountNumber = val.accountNo.toString();
        data.ifsc = val.ifsc;
        data.bankPincode = val.pincode.trim();
        data.bankState = val.state.trim();
        data.bankCity = val.city.trim();
        this.props.savePartner(data);
        setSubmitting(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { disable, initVal, pinError } = this.state;
    const { previous } = this.props;
    return (
      <div>
        <div className="formFinDiv">
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
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Row gutter={24}>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={12}
                    xl={12}
                    className="anime"
                  >
                    <div className="field">
                      <Label
                        title={finConst.bankName}
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
                    </div>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={12}
                    xl={12}
                    className="anime"
                  >
                    <div className="field">
                      <Label
                        title={finConst.branchName}
                        className={
                          errors.branchName && touched.branchName ? "empty" : ""
                        }
                      />
                      <Input
                        onBlur={handleBlur}
                        name="branchName"
                        value={values.branchName}
                        handleChange={handleChange}
                        tabIndex="2"
                        className={
                          errors.branchName && touched.branchName ? "empty" : ""
                        }
                      />
                    </div>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={12}
                    xl={12}
                    className="anime"
                  >
                    <div className="field">
                      <Label title={finConst.address} />
                      <Input
                        row={5}
                        onBlur={handleBlur}
                        name="address"
                        value={values.address}
                        handleChange={handleChange}
                        tabIndex="3"
                      />
                    </div>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={12}
                    xl={12}
                    className="anime"
                  >
                    <div className="field">
                      <Label
                        title={finConst.accNo}
                        className={
                          errors.accountNo && touched.accountNo ? "empty" : ""
                        }
                      />
                      <Input
                        type="number"
                        onBlur={handleBlur}
                        name="accountNo"
                        value={values.accountNo}
                        handleChange={handleChange}
                        tabIndex="4"
                        className={
                          errors.accountNo && touched.accountNo ? "empty" : ""
                        }
                      />
                    </div>
                    <div className="field">
                      <Label
                        title={finConst.ifsc}
                        className={errors.ifsc && touched.ifsc ? "empty" : ""}
                      />
                      <Input
                        onBlur={handleBlur}
                        name="ifsc"
                        value={values.ifsc}
                        handleChange={handleChange}
                        tabIndex="5"
                        className={errors.ifsc && touched.ifsc ? "empty" : ""}
                      />
                    </div>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={12}
                    xl={12}
                    className="anime"
                  >
                    <div className="field">
                      <Label
                        title={finConst.pincode}
                        className={pinError ? "empty" : ""}
                      />
                      <Input
                        type="number"
                        onBlur={handleBlur}
                        name="pincode"
                        value={values.pincode}
                        handleChange={(e) => {
                          this.handlePin(e.target.value, setFieldValue);
                        }}
                        tabIndex="6"
                        className={pinError ? "empty" : ""}
                      />
                    </div>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={12}
                    xl={12}
                    className="anime"
                  >
                    <div className="field">
                      <Label title={finConst.state} />
                      <Input
                        onBlur={handleBlur}
                        name="state"
                        value={values.state}
                        handleChange={handleChange}
                        tabIndex="8"
                      />
                    </div>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={12}
                    xl={12}
                    className="anime"
                  >
                    <div className="field">
                      <Label title={finConst.city} />
                      <Input
                        onBlur={handleBlur}
                        name="city"
                        value={values.city}
                        handleChange={handleChange}
                        tabIndex="7"
                      />
                    </div>
                  </Col>
                </Row>
                <div className="bottomFinDiv">
                  <div className="btnFin anime">
                    <Button onClick={previous}>{ButtonConst.previous}</Button>
                    <Button type="submit" disabled={disable}>
                      {finConst.next}
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}
export default withRouter(FinancialDetails);
